import { useContext, useState } from "react";
import { AuthContext } from "..";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Alert,
  Avatar,
  CircularProgress,
  Fab,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Group from "../components/group/Group";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

function CreateGroup() {
  const { auth, firestore } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const [searchId, setSearchId] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [findUser, setFindUser] = useState(undefined);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const searchById = async () => {
    try {
      setLoading(true);
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("uid", "==", searchId));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        setFindUser(doc.data());
      });
    } catch (error) {
      setError(true);
      alert("Error: " + error);
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

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
      <div style={{ display: "flex", padding: 10 }}>
        <Avatar alt="Group picture">
          <AddAPhotoIcon />
        </Avatar>
        <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Название группы..." />
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
        {loading && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </div>
        )}
        {error && <div>Error</div>}
        {findUser && (
          <Group
            onClick={selectUser}
            img={findUser.photoUrl}
            primary={findUser.displayName}
            secondary={findUser.uid}
          />
        )}
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
        <Fab
          style={{ position: "absolute", bottom: "2vh", right: "2vw" }}
          color="primary"
          aria-label="add"
        >
          <ArrowForwardIcon />
        </Fab>
      )}
      <Alert severity="info">This is an info alert — check it out!</Alert>;
    </div>
  );
}

export default CreateGroup;
