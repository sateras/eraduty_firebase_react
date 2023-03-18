import { Button } from "@mui/material";
import styles from "./ChatTextFieldWithButton.module.css";
import SendIcon from "@mui/icons-material/Send";

function ChatTextFieldWithButton({
  onChangeText,
  textFieldValue,
  onClickButton,
}) {
  return (
    <div className={styles.container}>
      <input
        value={textFieldValue}
        onChange={(e) => onChangeText(e.target.value)}
      ></input>
      <Button
        onClick={onClickButton}
        className={styles.button}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </div>
  );
}

export default ChatTextFieldWithButton;
