import { collection, getFirestore } from "firebase/firestore";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Context } from "..";
import ChatTextFieldWithButton from "../components/chatTextFieldWithButton/ChatTextFieldWithButton";
import ChatWindow from "../components/chatWindow/ChatWindow";

function GlobalChat() {
  const { auth, firebaseApp } = useContext(Context);
  const firestore = getFirestore(firebaseApp);
  const [user] = useAuthState(auth);

  const [text, setText] = useState("");

  const [value, loading, error] = useCollection(
    collection(firestore, "groups"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const sendMessage = () => {
    console.log(text);
  };

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
      <ChatWindow />
      <ChatTextFieldWithButton
        onChangeText={setText}
        textFieldValue={text}
        onClickButton={sendMessage}
      />
    </div>
  );
}

export default GlobalChat;
