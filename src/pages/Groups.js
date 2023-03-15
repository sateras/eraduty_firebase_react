import { Container } from "@mui/material";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";
import MainWindow from "../components/mainWindow/MainWindow";

function Groups() {
  return (
    <div>
      <MainWindow />
    </div>
  );
}

export default Groups;
