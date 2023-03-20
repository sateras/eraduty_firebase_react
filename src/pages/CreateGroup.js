import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "..";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
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

function CreateGroup() {
  const { auth, firestore } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [user, setUser] = useState({});

  const searchById = async () => {
    try {
      const usersRef = collection(firestore, "users");
      const q = query(usersRef, where("uid", "==", searchId));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
        console.log(doc.data());
      });
      // setLoading(true);
      // const data = await getDocs(collection(firestore, "users"));
      // data.docs.forEach((e) => {
      //   if (e.data().uid === searchId) {
      //   }
      // });
      // setLoading(false);
    } catch (error) {
      alert("Error: " + error);
    }
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
        <Group
          img={user.photoUrl}
          primary={user.displayName}
          secondary={user.uid}
        />
      </List>
    </div>
  );
}

export default CreateGroup;
