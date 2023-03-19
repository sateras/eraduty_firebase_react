import { collection } from "firebase/firestore";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { AuthContext } from "..";

function CreateGroup() {
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
      create group
    </div>
  );
}

export default CreateGroup;
