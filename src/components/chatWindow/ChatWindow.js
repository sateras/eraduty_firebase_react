import { Avatar, Grid } from "@mui/material";
import styles from "./ChatWindow.module.css";

function ChatWindow({ messages, user }) {
  return (
    <div
      style={{
        overflowY: "auto",
        height: "calc(100vh - 100px) ",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.docs.map((e) => (
        <Grid
          key={e.id}
          style={{
            marginBottom: 10,
            justifyContent:
              user.uid === e.data().uid ? "flex-end" : "flex-start",
          }}
          container
        >
          {user.uid !== e.data().uid && <Avatar src={e.data().photoUrl} />}
          <div
            className={
              user.uid === e.data().uid ? styles.myMessage : styles.message
            }
          >
            {user.uid !== e.data().uid && (
              <div className={styles.name}>{e.data().displayName}</div>
            )}
            <div>{e.data().text}</div>
          </div>
        </Grid>
      ))}
    </div>
  );
}

export default ChatWindow;
