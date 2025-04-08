import { ISidebarMessage } from "@/store/messages/models";
import classnames from "classnames";
import styles from "./index.module.scss";

type SidebarMessageMaped = ISidebarMessage & {
  shownName: string;
  linkCallback: (peer: number) => void;
  setMobileView: React.Dispatch<React.SetStateAction<boolean>>;
  link: number;
  isActive: boolean;
};

const Conversation: React.FC<SidebarMessageMaped> = (
  props: SidebarMessageMaped
) => {
  const classes = classnames({
    [styles.active]: props.isActive,
    [styles.conversation]: true,
  });

  const action = () => {
    props.linkCallback(props.link);
    props.setMobileView(true);
  };

  return (
    <div className={classes} onClick={() => action()}>
      <div className={styles.avatar}></div>
      <div className={styles.person}>
        <div>
          <p>{props.shownName}</p>
          <span>{props.createdFormatDate}</span>
        </div>
        <div>
          <p>{props.message}</p>
          {/* {!!props.unread_count && <span>{props.unread_count}</span>} */}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
