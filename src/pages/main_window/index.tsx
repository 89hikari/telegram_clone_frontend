import React, { useEffect, useRef } from 'react';
import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client/debug';

import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { DownOutlined } from "@ant-design/icons";

import Message from '../../components/message';
import Conversation from '../../components/conversation';
import Menu from '../../components/menu';

import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { RootState } from '../../store';

import { checkTokenExpired, parseJwt } from '../../utils/parseToken';
import { clearData, setUserDataFromToken } from '../../store/global/globalSlice';
import { getAllMessagesById, getSidebarLastMessages, sendMessage } from '../../store/messages/api';
import { catchMessageFromSocket } from '../../store/messages/messagesSlice';

import styles from "./index.module.scss";

const socket = io(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_URL}`, {
    autoConnect: false
});

const MainWindow: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { peer_id = '' } = useParams();

    const { token, user } = useAppSelector((state: RootState) => state.global);
    const { sidebar, currentMessages } = useAppSelector((state: RootState) => state.messages);

    const [pageVisible, setPageVisible] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [scrollButtonActive, setScrollButtonActive] = useState<boolean>(false);

    const goToChat = (peer: number) => navigate(`/chat/${peer}`);

    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const SOCKET_POST_MESSAGE_TOPIC = `sendMessage`;
    let SOCKET_GET_MESSAGE_TOPIC: string;

    const checkAuth = () => {
        if (token) {
            const tokenData = parseJwt(token);
            if (checkTokenExpired(tokenData.exp)) {
                dispatch(clearData());
                return;
            }

            dispatch(setUserDataFromToken());
            setPageVisible(true);
            socket.connect();
            return;
        }

        navigate("/noauth");
    }

    const emptyTokenRedirect = () => {
        if (!token) navigate("/noauth");
    }

    const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const bottom =
            (event.target as HTMLInputElement).scrollHeight - (event.target as HTMLInputElement).scrollTop
            === (event.target as HTMLInputElement).clientHeight;

        if (!bottom) {
            setScrollButtonActive(true);
            return;
        }
        setScrollButtonActive(false);
    }

    const handleInput = (
        event: React.ChangeEvent<HTMLTextAreaElement>,
        callback: React.Dispatch<React.SetStateAction<string>>
    ) => {
        callback(event.target.value);
    }

    const checkEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && event.shiftKey) return;
        if (event.key === 'Enter' && message.trim() !== '') {
            event.preventDefault();
            dispatch(sendMessage({ message: message, receiverId: +peer_id }));
            socket.emit(SOCKET_POST_MESSAGE_TOPIC, {
                message: message,
                receiverId: +peer_id,
                senderId: user.id,
                updatedAt: new Date(),
                createdAt: new Date()
            });
            setMessage('');
        }
    }

    const calcActiveChat = (receiver: number, sender: number) => sender === +peer_id || receiver === +peer_id;

    useEffect(() => {
        checkAuth();
        if (token) {
            dispatch(getSidebarLastMessages({}));
        }
    }, []);

    useEffect(() => {
        emptyTokenRedirect();
    }, [token]);

    useEffect(() => {
        if (peer_id) {
            dispatch(getAllMessagesById({ id: peer_id }));
        }
    }, [peer_id]);

    // SET TOPIC FOR TWO PEOPLE CHATTING
    useEffect(() => {
        if (peer_id && user.id) {
            SOCKET_GET_MESSAGE_TOPIC = `messages_${[+peer_id, +user.id].sort().join("_")}`;
            socket.timeout(5000).on(SOCKET_GET_MESSAGE_TOPIC, (msg) => {
                dispatch(catchMessageFromSocket(msg));
            });
        }
    }, [peer_id, user.id]);

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    return (
        pageVisible &&
        <section className={styles.wrapper}>
            <Menu isOpen={openModal} openCallback={setOpenModal} />
            <div className={styles.sidebar}>
                <div className={styles.search}>
                    <div className={styles.options_btn} onClick={() => setOpenModal(true)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <Input
                        placeholder="Search"
                        style={{
                            height: 42,
                            borderRadius: 22,
                            padding: "0 44px",
                        }}
                    />
                </div>
                <div className={styles.conversations}>
                    {sidebar.map((el, key) =>
                        <Conversation
                            key={key}
                            {...el}
                            isActive={calcActiveChat(el.receiverId, el.senderId)}
                            shownName={user.id === el.senderId ? el.receiver.name : el.sender.name}
                            linkCallback={goToChat}
                            link={user.id === el.senderId ? el.receiverId : el.senderId}
                        />
                    )}
                </div>
            </div>
            <div className={styles.chat}>
                <div className={styles.peer_header}>
                    <div className={styles.person}>
                        <div className={styles.avatar}></div>
                        <div>
                            <p>Name name</p>
                            <span>last seen a decade ago</span>
                        </div>
                    </div>
                </div>
                <div className={styles.chat__viewport}>
                    <div className={styles.messages} onScroll={(e) => handleScroll(e)}>
                        {currentMessages.map((el, key) => <Message key={key} {...el} isMe={el.senderId !== +peer_id} />)}
                        <div ref={messagesEndRef} />
                        {scrollButtonActive && <div className={styles.gobottom_btn} onClick={() => scrollToBottom()}><DownOutlined /></div>}
                    </div>
                    <div className={styles.input_wrapper}>
                        <TextArea
                            value={message}
                            onKeyDown={(e) => checkEnterPress(e)}
                            onChange={(e) => handleInput(e, setMessage)}
                            placeholder="Type your message here"
                            style={{
                                padding: "15px 20px"
                            }}
                            autoSize={{ minRows: 1, maxRows: 5 }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainWindow;
