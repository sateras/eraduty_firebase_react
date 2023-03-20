import { collection } from "firebase/firestore";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
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
import { getAuth } from "firebase/auth";

function CreateGroup() {
  const { auth, firestore } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const [value, loading, error] = useCollection(
    collection(firestore, "groups"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  // getAuth()
  //   .getUsers([
  //     { uid: "uid1" },
  //     { email: "user2@example.com" },
  //     { phoneNumber: "+15555550003" },
  //     { providerId: "google.com", providerUid: "google_uid4" },
  //   ])
  //   .then((getUsersResult) => {
  //     console.log("Successfully fetched user data:");
  //     getUsersResult.users.forEach((userRecord) => {
  //       console.log(userRecord);
  //     });

  //     console.log("Unable to find users corresponding to these identifiers:");
  //     getUsersResult.notFound.forEach((userIdentifier) => {
  //       console.log(userIdentifier);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Error fetching user data:", error);
  //   });

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
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Участник..." />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </div>
      </div>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Group primary={"hellooo"} secondary={"wooorld"} />

        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Summer BBQ"
            secondary={"Wish I could come, but I'm out of town this…"}
          />
        </ListItem>
      </List>
    </div>
  );
}

export default CreateGroup;
