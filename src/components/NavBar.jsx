import {
  AppBar,
  Avatar,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useMatch } from "react-router-dom";
import { GLOBALCHAT_ROUTE, LOGIN_ROUTE, SETTINGS_ROUTE } from "../utils/consts";
import { signOut } from "firebase/auth";
import { AuthContext } from "../contexts/auth";

function Navbar() {
  const isGlobalChat = useMatch(GLOBALCHAT_ROUTE);

  const { auth } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goOut = () => {
    signOut(auth);
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {isGlobalChat && (
          <Typography
            style={{ whiteSpace: "nowrap" }}
            align="inherit"
            variant="h6"
            component="div"
          >
            Global chat
          </Typography>
        )}
        <Grid container justifyContent={"flex-end"}>
          {user ? (
            <>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt="PhotoUrl" src={user.photoURL} />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <NavLink
                  style={{ textDecoration: "none", color: "black" }}
                  to={SETTINGS_ROUTE}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Настройки</Typography>
                  </MenuItem>
                </NavLink>
                <MenuItem onClick={goOut}>
                  <Typography textAlign="center">Выйти</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <NavLink style={{ textDecoration: "none" }} to={LOGIN_ROUTE}>
              <Button variant="contained">Войти</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
