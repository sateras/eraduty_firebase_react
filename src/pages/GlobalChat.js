import {
  collection,
  getFirestore,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
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
  const [loadingText, setLoadingText] = useState(false);

  const [value, loading, error] = useCollection(
    collection(firestore, "groups"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const sendMessage = async () => {
    try {
      setLoadingText(true);
      const docRef = await addDoc(collection(firestore, "globalChatMessages"), {
        uid: user.uid,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        text: text,
        createdAt: serverTimestamp(),
      });
      setText("");
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoadingText(false);
  };

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
      <ChatWindow />
      <ChatTextFieldWithButton
        ifLoading={loadingText}
        onChangeText={setText}
        textFieldValue={text}
        onClickButton={sendMessage}
      />
    </div>
  );
}

export default GlobalChat;
