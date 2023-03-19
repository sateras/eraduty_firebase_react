import {
  collection,
  getFirestore,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "..";
import ChatTextFieldWithButton from "../components/chatTextFieldWithButton/ChatTextFieldWithButton";
import ChatWindow from "../components/chatWindow/ChatWindow";
import { useCollection } from "react-firebase-hooks/firestore";

function GlobalChat() {
  const { auth, firestore } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const [text, setText] = useState("");
  const [loadingText, setLoadingText] = useState(false);

  const [messages, loading, error] = useCollection(
    query(collection(firestore, "globalChatMessages"), orderBy("createdAt")),
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
    <div style={{ height: "calc(100vh - 60px)" }}>
      {messages && <ChatWindow messages={messages} user={user} />}
      <ChatTextFieldWithButton
        isLoading={loadingText}
        onChangeText={setText}
        textFieldValue={text}
        onClickButton={sendMessage}
      />
    </div>
  );
}

export default GlobalChat;
