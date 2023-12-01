import classnames from "classnames";
import styles from "./index.module.scss";
import { ISidebarMessage } from "../../store/messages/models";

type SidebarMessageMaped
    = ISidebarMessage
    & {
        shownName: string,
        linkCallback: (peer: number) => void,
        link: number,
        isActive: boolean
    };

const Conversation: React.FC<SidebarMessageMaped> = (props: SidebarMessageMaped) => {
    const classes = classnames({
        [styles.active]: props.isActive,
        [styles.conversation]: true,
    });

    return (
        <div className={classes} onClick={() => props.linkCallback(props.link)}>
            <div className={styles.avatar}></div>
            <div className={styles.person}>
                <div>
                    <p>{props.shownName}</p>
                    <span>{props.createdFormatDate}</span>
                </div>
                <div>
                    <p>
                        {props.message}
                    </p>
                    {/* {!!props.unread_count && <span>{props.unread_count}</span>} */}
                </div>
            </div>
        </div>
    );
};

export default Conversation;
