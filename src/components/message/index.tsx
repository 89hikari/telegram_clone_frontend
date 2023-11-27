import classnames from "classnames";
import IMessage from "./IMessage.model";
import styles from "./index.module.scss";

const Message: React.FC<IMessage> = (props: IMessage) => {
    const classes = classnames({
        [styles.me]: props.isMe,
        [styles.message]: true,
    });

    return (
        <div className={classes}>
            <p>{props.text}</p>
            <span>{props.time}</span>
        </div>
    );
};

export default Message;
