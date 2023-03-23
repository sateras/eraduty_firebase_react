import { useContext, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Avatar,
  CircularProgress,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Group from "../components/group/Group";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import FloatingActionButton from "../components/FloatingActionButtonNav";
import { AuthContext } from "../contexts/auth";

function CreateGroup() {
  const { auth, firestore } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const [searchId, setSearchId] = useState("");
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [findUser, setFindUser] = useState(undefined);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const searchById = async () => {
    if (user.uid != searchId) {
      try {
        setLoading(true);
        const usersRef = collection(firestore, "users");
        const q = query(usersRef, where("uid", "==", searchId));
        const querySnapshot = await getDocs(q);
        console.log(user.uid);

        querySnapshot.forEach((doc) => {
          setFindUser(doc.data());
        });
      } catch (error) {
        setError(true);
        alert("Error: " + error);
      }
    }
    setLoading(false);
  };

  const unselectUser = (user) => {
    setSelectedUsers(selectedUsers.filter((p) => p !== user));
  };
  const selectUser = () => {
    if (selectedUsers.includes(findUser)) {
      // tut budet ALLERT
    } else {
      setSelectedUsers([...selectedUsers, findUser]);
    }
    console.log(selectedUsers.includes(findUser));
  };

  const createGroup = async () => {
    try {
      const usersID = [user.uid].concat(selectedUsers.map((user) => user.uid));
      const usersName = [user.displayName].concat(
        selectedUsers.map((user) => user.displayName)
      );

      const docRef = await addDoc(collection(firestore, "groups"), {
        members: usersID,
        users: { usersName: usersName },
        name: groupName,
        photoUrl: user.photoURL,
      });
      setSelectedUsers([]);
      setGroupName("");

      // TODO: Сделать переадресацию в созданную группу
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
      <div style={{ display: "flex", padding: 10 }}>
        <input
          onChange={(e) => setFile(e.target.files)}
          style={{ display: "none" }}
          type={"file"}
          id="file"
        />
        <label htmlFor="file">
          <Avatar type alt="Group picture">
            <AddAPhotoIcon />
          </Avatar>
        </label>
        <InputBase
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Название группы..."
        />
      </div>
      <div style={{ padding: 10, backgroundColor: "#e0e0e0" }}>
        Добавить участника
        <div style={{ display: "flex" }}>
          <InputBase
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Участник..."
          />
          <IconButton
            onClick={searchById}
            type="button"
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {error && <div>Error</div>}
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        ) : findUser ? (
          <Group
            onClick={selectUser}
            img={findUser.photoUrl}
            primary={findUser.displayName}
            secondary={findUser.uid}
          />
        ) : null}
        {selectedUsers.map((e) => (
          <ListItem
            onClick={() => unselectUser(e)}
            style={{ backgroundColor: "#aefa9b" }}
            key={e.uid}
          >
            <ListItemAvatar>
              <Avatar src={e.photoUrl} alt="Profile Picture" />
            </ListItemAvatar>
            <ListItemText primary={e.displayName} secondary={e.uid} />
            <IconButton edge="end" aria-label="delete">
              <CloseIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      {selectedUsers.length > 0 && (
        <FloatingActionButton onClick={createGroup}>
          <ArrowForwardIcon />
        </FloatingActionButton>
      )}
    </div>
  );
}

export default CreateGroup;
