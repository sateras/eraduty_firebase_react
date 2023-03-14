import { Route, Routes, Navigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { GROUPS_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";
import { useContext } from "react";

function AppRouter() {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  return user ? (
    <Routes>
      {privateRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} exact={true} />
      ))}

      <Route path="*" element={<Navigate to={GROUPS_ROUTE} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map(({ path, component }) => (
        <Route key={path} path={path} element={component} exact={true} />
      ))}
      <Route path="*" element={<Navigate replace to={MAIN_ROUTE} />} />
    </Routes>
  );
}

export default AppRouter;
