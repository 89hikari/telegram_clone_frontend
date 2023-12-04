import classnames from "classnames";
import IMessage from "./IMessage.model";
import styles from "./index.module.scss";

const Message: React.FC<IMessage & { isMe: boolean }> = (props: IMessage & { isMe: boolean }) => {
    const classes = classnames({
        [styles.me]: props.isMe,
        [styles.message]: true,
    });

    return (
        <div className={classes}>
            <p>{props.message?.trim()}</p>
            <span>{props.createdFormatDate}</span>
        </div>
    );
};

export default Message;
