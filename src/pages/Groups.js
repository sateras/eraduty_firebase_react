import { collection, query, where } from "firebase/firestore";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import GroupsLoader from "../components/state/GroupsLoader";
import AddIcon from "@mui/icons-material/Add";
import GroupsList from "../components/GroupsList";
import { CREATEGROUP_ROUTE } from "../utils/consts";
import FloatingActionButton from "../components/FloatingActionButtonNav";
import { AuthContext } from "../contexts/auth";

function Groups() {
  const { auth, firestore } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const q = query(
    collection(firestore, "groups"),
    where("members", "array-contains", user.uid)
  );

  const [value, loading, error] = useCollection(q, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
      {loading && <GroupsLoader />}
      {error && <div> {error} </div>}
      {value && <GroupsList value={value} />}

      <FloatingActionButton to={CREATEGROUP_ROUTE}>
        <AddIcon />
      </FloatingActionButton>
    </div>
  );
}

export default Groups;
