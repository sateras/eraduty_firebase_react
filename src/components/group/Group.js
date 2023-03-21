import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function Group({ img, primary, secondary, onClick }) {
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar src={img} alt="Profile Picture" />
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

export default Group;
