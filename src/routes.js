import Login from "./pages/Login";
import Main from "./pages/Main";
import GlobalChat from "./pages/GlobalChat";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";

import {
  CREATEGROUP_ROUTE,
  GLOBALCHAT_ROUTE,
  GROUPS_ROUTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
} from "./utils/consts";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    component: <Login />,
  },
  {
    path: MAIN_ROUTE,
    component: <Main />,
  },
];

export const privateRoutes = [
  {
    path: GROUPS_ROUTE,
    component: <Groups />,
  },
  {
    path: GLOBALCHAT_ROUTE,
    component: <GlobalChat />,
  },
  {
    path: CREATEGROUP_ROUTE,
    component: <CreateGroup />,
  },
];
