import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from ".";
import Loader from "./components/Loader";

function App() {
  const { auth } = useContext(Context);
  const [user, loading] = useAuthState(auth);

  return (
    <BrowserRouter>
      <Navbar />
      {loading ? <Loader /> : <AppRouter />}
    </BrowserRouter>
  );
}

export default App;
