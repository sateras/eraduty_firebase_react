import { Button, Container, Grid } from "@mui/material";
import { useContext } from "react";
import { Context } from "..";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const provider = new GoogleAuthProvider();

function Login() {
  const { auth } = useContext(Context);

  const login = async () => {
    const { user } = await signInWithPopup(auth, provider);
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
