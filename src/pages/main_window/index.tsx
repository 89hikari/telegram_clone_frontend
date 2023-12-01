import React, { useEffect, useRef } from 'react'
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Message from '../../components/message';
import Conversation from '../../components/conversation';
import styles from "./index.module.scss";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/stateHooks';
import { RootState } from '../../store';
import { checkTokenExpired, parseJwt } from '../../utils/parseToken';
import { clearData, setUserDataFromToken } from '../../store/global/globalSlice';

const MainWindow: React.FC = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { token } = useAppSelector((state: RootState) => state.global);
    const [pageVisible, setPageVisible] = useState<boolean>(false);

    const checkAuth = () => {
        if (token) {
            const tokenData = parseJwt(token);
            if (checkTokenExpired(tokenData.exp)) {
                dispatch(clearData());
                return;
            }

            dispatch(setUserDataFromToken());
            setPageVisible(true);
            return;
        }

        navigate("/noauth");
    }

    const emptyTokenRedirect = () => {
        if (!token) navigate("/noauth");
    }

    useEffect(() => {
        emptyTokenRedirect();
    }, [token]);

    useEffect(() => {
        checkAuth();
    }, []);

    const [scrollButtonActive, setScrollButtonActive] = useState<boolean>(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

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

    const messages = [
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrsporgj gpsojrpos jrgspoj grspog jr",
            time: "15:33",
            isMe: false
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrspor",
            time: "15:33",
            isMe: false
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrsporgj gpsojrpos jrgspoj grspog jr",
            time: "15:33",
            isMe: false
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrspor",
            time: "15:33",
            isMe: false
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrsporgj gpsojrpos jrgspoj grspog jr",
            time: "15:33",
            isMe: false
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrspor",
            time: "15:33",
            isMe: false
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposg",
            time: "15:33",
            isMe: true
        }
    ];

    const convs = [
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrsporgj gpsojrpos jrgspoj grspog jr",
            time: "15:33",
            name: "Vasya Pupkin",
            unread_count: 11
        },
        {
            text: "Lorem mgsrmgsrmgsr mjposgrpo  sgrpjogpojsrpgojsrsporgj gpsojrpos jrgspoj grspog jr",
            time: "15:33",
            name: "Vasya",
            unread_count: 4
        },
        {
            text: "Lorem mgsrmgsrmgsr m",
            time: "15:33",
            name: "Pupkin",
            unread_count: 0
        }
    ]

    return (
        pageVisible &&
        <section className={styles.wrapper}>
            <div className={styles.sidebar}>
                <div className={styles.search}>
                    <div className={styles.options_btn}>
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
                    {convs.map((el, key) => <Conversation key={key} {...el} />)}
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
                        {messages.map((el, key) => <Message key={key} {...el} />)}
                        <div ref={messagesEndRef} />
                        {scrollButtonActive && <div className={styles.gobottom_btn} onClick={() => scrollToBottom()}><DownOutlined /></div>}
                    </div>
                    <div className={styles.input_wrapper}>
                        <TextArea
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
