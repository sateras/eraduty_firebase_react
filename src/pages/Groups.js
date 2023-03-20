import { Fab } from "@mui/material";
import { collection } from "firebase/firestore";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { AuthContext } from "..";
import GroupsLoader from "../components/state/GroupsLoader";
import AddIcon from "@mui/icons-material/Add";
import GroupsList from "../components/GroupsList";
import { NavLink } from "react-router-dom";
import { CREATEGROUP_ROUTE } from "../utils/consts";

function Groups() {
  const { auth, firestore } = useContext(AuthContext);
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

      <NavLink style={{ textDecoration: "none" }} to={CREATEGROUP_ROUTE}>
        <Fab
          style={{ position: "absolute", bottom: "2vh", right: "2vw" }}
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </NavLink>
    </div>
  );
}

export default Groups;
