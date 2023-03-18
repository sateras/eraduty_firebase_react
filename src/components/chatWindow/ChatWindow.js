import { Avatar, Grid } from "@mui/material";
import styles from "./ChatWindow.module.css";

function ChatWindow({ messages }) {
  return (
    <div
      style={{
        overflowY: "auto",
        height: "calc(100vh - 100px) ",
      }}
    >
      {messages.docs.map((e) => (
        <Grid
          style={{
            marginBottom: 10,
          }}
          container
        >
          <Avatar src={e.data().photoUrl} />
          <div className={styles.message}>
            <div className={styles.name}>{e.data().displayName}</div>
            <div>{e.data().text}</div>
          </div>
        </Grid>
      ))}
    </div>
  );
}

export default ChatWindow;
