import { Button, Container, Grid } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "..";

import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const provider = new GoogleAuthProvider();

function Login() {
  const { auth } = useContext(AuthContext);

  const login = async () => {
    try {
      const { user } = await signInWithRedirect(auth, provider);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 100 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Button onClick={login} variant="contained">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqOAZphgekT0e06wtwTx9-B_ZeX_ymipCj8EKS2vOUYbx7NeTu93hJF4gnWyKpqdAVAuk&usqp=CAU"
            width={30}
            style={{ padding: 3 }}
            alt="google_img"
          />
          Войти с помощю Google
        </Button>
      </Grid>
    </Container>
  );
}

export default Login;
