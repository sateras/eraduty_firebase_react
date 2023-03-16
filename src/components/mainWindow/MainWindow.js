import { Fab, List } from "@mui/material";
import Group from "../groups/Group";
import styles from "./MainWindow.module.css";
import AddIcon from "@mui/icons-material/Add";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useContext } from "react";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import GroupsLoader from "../state/GroupsLoader";

function MainWindow() {
  const { auth, firebaseApp } = useContext(Context);
  const firestore = getFirestore(firebaseApp);
  const [user] = useAuthState(auth);

  const [value, loading, error] = useCollection(
    collection(firestore, "groups"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div className={styles.window}>
      {loading && <GroupsLoader />}
      {error && <div> {error} </div>}
      {value && (
        <List sx={{ mb: 2 }}>
          {value.docs.map((e) => (
            <Group
              key={e.id}
              primary={e.data().name}
              secondary={e.data().users.usersName.join(", ")}
            />
          ))}
        </List>
      )}

      <Fab className={styles.addButton} color="primary" aria-label="add">
        <AddIcon />
      </Fab>
    </div>
  );
}

export default MainWindow;
