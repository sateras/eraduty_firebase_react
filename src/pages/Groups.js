import { Fab } from "@mui/material";
import { collection } from "firebase/firestore";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Context } from "..";
import GroupsLoader from "../components/state/GroupsLoader";
import AddIcon from "@mui/icons-material/Add";
import GroupsList from "../components/GroupsList";

function Groups() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  const [value, loading, error] = useCollection(
    collection(firestore, "groups"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
      {loading && <GroupsLoader />}
      {error && <div> {error} </div>}
      {value && <GroupsList value={value} />}

      <Fab
        style={{ position: "absolute", bottom: "2vh", right: "2vw" }}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Groups;
