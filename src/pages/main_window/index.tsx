import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client/debug";

import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import Conversation from "@/components/conversation";
import DebaunceUserSearch from "@/components/debaunce_user_search";
import Menu from "@/components/menu";
import Message from "@/components/message";

import { useAppDispatch, useAppSelector } from "@/hooks/stateHooks";
import { RootState } from "@/store";

import { clearData, setUserDataFromToken } from "@/store/global/globalSlice";
import {
  getAllMessagesById,
  getPeerInfo,
  getSidebarLastMessages,
  sendMessage,
} from "@/store/messages/api";
import {
  catchMessageFromSocket,
  catchNonExistendMessageFromSocket,
} from "@/store/messages/messagesSlice";
import { checkTokenExpired, parseJwt } from "@/utils/parseToken";

import styles from "./index.module.scss";

const socket = io(import.meta.env.VITE_API_BASE_URL, {
  autoConnect: false,
});

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  const updateSize = () => setSize([window.innerWidth, window.innerHeight]);
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const MainWindow: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { peer_id = "" } = useParams();

  const { token, user } = useAppSelector((state: RootState) => state.global);
  const { sidebar, currentMessages, peerInfo } = useAppSelector(
    (state: RootState) => state.messages
  );

  const [pageVisible, setPageVisible] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [scrollButtonActive, setScrollButtonActive] = useState<boolean>(false);

  const goToChat = (peer: number) => navigate(`/chat/${peer}`);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const SOCKET_POST_MESSAGE_TOPIC = `sendMessage`;
  let SOCKET_GET_MESSAGE_TOPIC: string;

  const [width] = useWindowSize();

  const [sidebarMobile, setSidebarMobile] = useState<boolean>(false);
  const [mobileViewChat, setMobileViewChat] = useState<boolean>(
    !!peer_id && !sidebarMobile
  );

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

    socket.disconnect();
    navigate("/noauth");
  };

  const emptyTokenRedirect = () => {
    if (!token) {
      socket.disconnect();
      navigate("/noauth");
    }
  };

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      (event.target as HTMLInputElement).scrollHeight -
        (event.target as HTMLInputElement).scrollTop ===
      (event.target as HTMLInputElement).clientHeight;

    if (!bottom) {
      setScrollButtonActive(true);
      return;
    }
    setScrollButtonActive(false);
  };

  const handleInput = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    callback: React.Dispatch<React.SetStateAction<string>>
  ) => {
    callback(event.target.value);
  };

  const createMessageInTopic = () => {
    socket.emit(SOCKET_POST_MESSAGE_TOPIC, {
      message: message,
      receiverId: +peer_id,
      senderId: user.id,
      updatedAt: new Date(),
      createdAt: new Date(),
      receiver: {
        id: peerInfo.id,
        name: peerInfo.name,
      },
      sender: {
        id: user.id,
        name: user.name,
      },
    });
  };

  const checkEnterPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) return;
    if (event.key === "Enter" && message.trim() !== "") {
      event.preventDefault();
      dispatch(sendMessage({ message: message, receiverId: +peer_id }));
      createMessageInTopic();
      setMessage("");
    }
  };

  const calcActiveChat = (receiver: number, sender: number) =>
    sender === +peer_id || receiver === +peer_id;

  const handleMobileView = (sidebarVisible: boolean) => {
    sidebarMobile && setMobileViewChat(sidebarVisible);
  };

  const calcMobileSidebar = !sidebarMobile ? true : !mobileViewChat;

  // CHECK AUTH AND GET PAGE DATA
  useEffect(() => {
    checkAuth();
    if (token) {
      dispatch(getSidebarLastMessages({}));
    }
  }, []);

  // REDIRECT IF TOKEN IS EMPTY
  useEffect(() => {
    emptyTokenRedirect();
  }, [token]);

  // GET CUR PEER DATA
  useEffect(() => {
    if (peer_id) {
      dispatch(getAllMessagesById({ id: peer_id }));
      dispatch(getPeerInfo({ id: peer_id }));
    }
  }, [peer_id]);

  // SET TOPIC FOR TWO PEOPLE CHATTING
  useEffect(() => {
    if (peer_id && user.id) {
      setMobileViewChat(true);
      SOCKET_GET_MESSAGE_TOPIC = `messages_${[+peer_id, +user.id]
        .sort()
        .join("_")}`; // lol
      const socketCallback = (msg: any) =>
        dispatch(catchMessageFromSocket(msg));
      socket
        .off(SOCKET_GET_MESSAGE_TOPIC, socketCallback)
        .on(SOCKET_GET_MESSAGE_TOPIC, socketCallback); // workaround to get rid of doubles
      return () => {
        socket.off(SOCKET_GET_MESSAGE_TOPIC, socketCallback);
      };
    }
  }, [peer_id, user.id]);

  // SET TOPIC NEW, NON EXISTEND CHAT
  useEffect(() => {
    if (user.id) {
      const socketCallback = (msg: any) =>
        dispatch(catchNonExistendMessageFromSocket(msg));
      socket
        .off(`new_messages_${user.id}`, socketCallback)
        .on(`new_messages_${user.id}`, socketCallback); // workaround to get rid of doubles
      return () => {
        socket.off(`new_messages_${user.id}`, socketCallback);
      };
    }
  }, [user.id]);

  // SCROLL TO BOTTOM MESSAGES BLOCK
  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 200);
  }, [currentMessages]);

  // HIDE DEFAULT SIDEBAR IF SCREEN WIDTH IS BELOW 896 PX
  useEffect(() => {
    if (width <= 896) {
      setSidebarMobile(true);
      return;
    }

    setSidebarMobile(false);
  }, [width]);

  return (
    pageVisible && (
      <section className={styles.wrapper}>
        <Menu isOpen={openModal} openCallback={setOpenModal} />
        {calcMobileSidebar && (
          <div className={styles.sidebar}>
            <div className={styles.search}>
              <div
                className={styles.options_btn}
                onClick={() => setOpenModal(true)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <DebaunceUserSearch />
            </div>
            <div className={styles.conversations}>
              {sidebar.map((el, key) => (
                <Conversation
                  key={key}
                  {...el}
                  isActive={calcActiveChat(el.receiverId, el.senderId)}
                  shownName={
                    user.id === el.senderId ? el.receiver.name : el.sender.name
                  }
                  linkCallback={goToChat}
                  setMobileView={setMobileViewChat}
                  link={user.id === el.senderId ? el.receiverId : el.senderId}
                />
              ))}
            </div>
          </div>
        )}
        {mobileViewChat && (
          <div className={styles.chat}>
            {!!peerInfo.id && (
              <div className={styles.peer_header}>
                <div className={styles.person}>
                  {sidebarMobile && (
                    <ArrowLeftOutlined
                      style={{ width: 30 }}
                      onClick={() => handleMobileView(false)}
                    />
                  )}
                  <div className={styles.avatar}></div>
                  <div>
                    <p>{peerInfo.name}</p>
                    <span>{peerInfo.email}</span>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.chat__viewport}>
              <div
                className={styles.messages}
                onScroll={(e) => handleScroll(e)}
              >
                {currentMessages.map((el, key) => (
                  <Message key={key} {...el} isMe={el.senderId !== +peer_id} />
                ))}
                <div ref={messagesEndRef} />
                {scrollButtonActive && (
                  <div
                    className={styles.gobottom_btn}
                    onClick={() => scrollToBottom()}
                  >
                    <DownOutlined />
                  </div>
                )}
              </div>
              <div className={styles.input_wrapper}>
                {!!peerInfo.id && (
                  <TextArea
                    value={message}
                    onKeyDown={(e) => checkEnterPress(e)}
                    onChange={(e) => handleInput(e, setMessage)}
                    placeholder="Type your message here"
                    style={{
                      padding: "15px 20px",
                    }}
                    autoSize={{ minRows: 1, maxRows: 5 }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    )
  );
};

export default MainWindow;
