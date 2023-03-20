import { Switch } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "../..";

function AllowToSearchMe() {
  const { auth, firestore } = useContext(AuthContext);
  const [user] = useAuthState(auth);
  const [loadingSwitch, setLoadingSwitch] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myId, setMyId] = useState("");

  useEffect(() => {
    const getUserList = async () => {
      setLoading(true);
      const data = await getDocs(collection(firestore, "users"));
      data.docs.forEach((e) => {
        if (e.data().uid === user.uid) {
          setIsUser(true);
          setMyId(e.id);
        }
      });
      setLoading(false);
    };
    getUserList();
  }, []);

  const addUser = async () => {
    try {
      setLoadingSwitch(true);
      const docRef = await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        displayName: user.displayName,
        photoUrl: user.photoURL,
        createdAt: serverTimestamp(),
      });
      setMyId(docRef.id);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setLoadingSwitch(false);
    setIsUser(true);
  };

  const deleteUser = async () => {
    try {
      setLoadingSwitch(true);
      await deleteDoc(doc(firestore, "users", myId));
    } catch (e) {
      console.error("Error delete user: ", e);
    }
    setLoadingSwitch(false);
    setIsUser(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      Разрешить искать себя
      {loading ? (
        "Загрузка идет..."
      ) : isUser ? (
        <Switch
          onClick={deleteUser}
          checked={true}
          disabled={loadingSwitch}
          color="primary"
        />
      ) : (
        <Switch
          onClick={addUser}
          checked={false}
          disabled={loadingSwitch}
          color="primary"
        />
      )}
    </div>
  );
}

export default AllowToSearchMe;
