import Alert from "@mui/material/Alert";

function Error({ error }) {
  return <Alert severity="error">{error}</Alert>;
}

export default Error;
