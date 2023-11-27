import classnames from "classnames";
import IConversation from "./IConversation.model";
import styles from "./index.module.scss";

const Conversation: React.FC<IConversation> = (props: IConversation) => {
    const classes = classnames({
        [styles.active]: false,
        [styles.conversation]: true,
    });

    return (
        <div className={classes}>
            <div className={styles.avatar}></div>
            <div className={styles.person}>
                <div>
                    <p>{props.name}</p>
                    <span>{props.time}</span>
                </div>
                <div>
                    <p>
                        {props.text}
                    </p>
                    {!!props.unread_count && <span>{props.unread_count}</span>}
                </div>
            </div>
        </div>
    );
};

export default Conversation;
