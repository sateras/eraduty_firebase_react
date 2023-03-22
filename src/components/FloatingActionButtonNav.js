import { Fab } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function FloatingActionButton({ children, to, onClick }) {
  return (
    <NavLink style={{ textDecoration: "none" }} to={to} onClick={onClick}>
      <Fab
        style={{ position: "absolute", bottom: "2vh", right: "2vw" }}
        color="primary"
        aria-label="add"
      >
        {children}
      </Fab>
    </NavLink>
  );
}
