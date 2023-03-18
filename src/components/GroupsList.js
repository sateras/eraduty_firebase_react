import { List } from "@mui/material";
import Group from "./group/Group";

function GroupsList({ value }) {
  return (
    <List sx={{ mb: 2 }}>
      <Group
        img={"https://static.thenounproject.com/png/3426830-200.png"}
        primary={"Global Chat"}
      />
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
