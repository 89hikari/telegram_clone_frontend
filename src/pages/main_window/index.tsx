import { Input } from "antd";
import styles from "./index.module.scss";
import classnames from "classnames";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";

const MainWindow: React.FC = () => {

    const [scrollButtonActive, setScrollButtonActive] = useState<boolean>(false);

    const cx = (isActive: boolean) => {
        return classnames({
            [styles.active]: isActive,
            [styles.conversation]: true,
        });
    };

    const messageClasses = (isMe: boolean) => {
        return classnames({
            [styles.me]: isMe,
            [styles.message]: true,
        });
    };

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

    return (
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
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx(true)}>
                        <div className={styles.avatar}></div>
                        <div className={styles.person}>
                            <div>
                                <p>Name name</p>
                                <span>00:11</span>
                            </div>
                            <div>
                                <p>
                                    message messaaf fa dad ffda adf af dafd ge
                                </p>
                                <span>22</span>
                            </div>
                        </div>
                    </div>
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
                        <div className={messageClasses(true)}>
                            <p>Lorem ipsum dolor sit amet conseafafctetur, adipisicin. r, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque od</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(false)}>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque odit vel sequi officiis? Provident numquam rem omnis inventore ducimus magnam fuga vitae dolorem.</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(true)}>
                            <p>Lorem ipsum dolor sit amet conseafafctetur, adipisicin. r, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque od</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(false)}>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque odit vel sequi officiis? Provident numquam rem omnis inventore ducimus magnam fuga vitae dolorem.</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(true)}>
                            <p>Lorem ipsum dolor sit amet conseafafctetur, adipisicin. r, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque od</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(false)}>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque odit vel sequi officiis? Provident numquam rem omnis inventore ducimus magnam fuga vitae dolorem.</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(true)}>
                            <p>Lorem ipsum dolor sit amet conseafafctetur, adipisicin. r, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque od</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(false)}>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque odit vel sequi officiis? Provident numquam rem omnis inventore ducimus magnam fuga vitae dolorem.</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(true)}>
                            <p>Lorem ipsum dolor sit amet conseafafctetur, adipisicin. r, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque od</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(false)}>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque odit vel sequi officiis? Provident numquam rem omnis inventore ducimus magnam fuga vitae dolorem.</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(true)}>
                            <p>Lorem ipsum dolor sit amet conseafafctetur, adipisicin. r, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque od</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(false)}>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque odit vel sequi officiis? Provident numquam rem omnis inventore ducimus magnam fuga vitae dolorem.</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(true)}>
                            <p>Lorem ipsum dolor sit amet conseafafctetur, adipisicin. r, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque od</p>
                            <span>16:33</span>
                        </div>
                        <div className={messageClasses(false)}>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo consequatur modi ullam officia, labore deleniti itaque odit vel sequi officiis? Provident numquam rem omnis inventore ducimus magnam fuga vitae dolorem.</p>
                            <span>16:33</span>
                        </div>
                        {scrollButtonActive && <div className={styles.gobottom_btn}><DownOutlined /></div>}
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
