import { FormControlLabel, Switch } from "@mui/material";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AuthContext } from "..";
import AllowToSearchMe from "../components/userSettings/AllowToSearchMe_setting";

function UserSettings() {
  const { auth, firestore } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  return (
    <div style={{ overflowY: "auto", height: "calc(100vh - 70px)" }}>
      <AllowToSearchMe />
    </div>
  );
}

export default UserSettings;
