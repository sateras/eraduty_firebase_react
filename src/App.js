import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import Navbar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import Loader from "./components/state/Loader";
import Error from "./components/state/Error";
import { AuthContext } from "./contexts/auth";

function App() {
  const { auth } = useContext(AuthContext);
  const [user, loading, error] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Navbar />
      {error && <Error error={error} />}
      {loading ? <Loader /> : <AppRouter />}
    </BrowserRouter>
  );
}

export default App;
