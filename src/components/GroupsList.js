import { Divider, List } from "@mui/material";
import { Link } from "react-router-dom";
import { GLOBALCHAT_ROUTE } from "../utils/consts";
import Group from "./group/Group";

function GroupsList({ value }) {
  return (
    <List sx={{ mb: 2 }}>
      <Link
        style={{ textDecoration: "none", color: "black" }}
        to={GLOBALCHAT_ROUTE}
      >
        <Group
          img={"https://static.thenounproject.com/png/3426830-200.png"}
          primary={"Global Chat"}
        />
      </Link>
      <Divider variant="inset" component="li" />
      {value.docs.map((e) => (
        <Group
          key={e.id}
          primary={e.data().name}
          secondary={e.data().users.usersName.join(", ")}
        />
      ))}
    </List>
  );
}

export default GroupsList;
