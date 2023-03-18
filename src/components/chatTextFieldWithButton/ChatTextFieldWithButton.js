import { Button, CircularProgress } from "@mui/material";
import styles from "./ChatTextFieldWithButton.module.css";
import SendIcon from "@mui/icons-material/Send";

function ChatTextFieldWithButton({
  onChangeText,
  textFieldValue,
  onClickButton,
  ifLoading,
}) {
  return (
    <div className={styles.container}>
      <input
        value={textFieldValue}
        onChange={(e) => onChangeText(e.target.value)}
      ></input>
      {ifLoading ? (
        <Button
          disabled
          onClick={onClickButton}
          className={styles.button}
          variant="contained"
          endIcon={<CircularProgress size={16} />}
        >
          Send
        </Button>
      ) : (
        <Button
          disabled={textFieldValue === "" && true}
          onClick={onClickButton}
          className={styles.button}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Send
        </Button>
      )}
    </div>
  );
}

export default ChatTextFieldWithButton;
