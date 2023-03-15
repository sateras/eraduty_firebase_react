import { Fab, List } from "@mui/material";
import Group from "../groups/Group";
import styles from "./MainWindow.module.css";
import AddIcon from "@mui/icons-material/Add";
import { collection, getDocs } from "firebase/firestore/lite";
import { useContext } from "react";
import { Context } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollection } from "react-firebase-hooks/firestore";

function MainWindow() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);

  //   const citiesCol = collection(firestore, "groups").orderBy("createdAt");
  //   const citySnapshot = getDocs(citiesCol);
  //   const [value, loading, error] = useCollection(citySnapshot);

  async function getCities(db) {
    const citiesCol = collection(db, "groups");
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => doc.data());
    return cityList;
  }

  const addGroup = () => {
    console.log(getCities(firestore));
  };

  return (
    <div className={styles.window}>
      <List sx={{ mb: 2 }}>
        <Group primary="Имя группы" secondary="Учасники группы" />
        <Group primary="123" secondary={"456"} />
      </List>
      <Fab
        onClick={addGroup}
        className={styles.addButton}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default MainWindow;
