import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function Group({ img, primary, secondary }) {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar src={img} alt="Profile Picture" />
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

export default Group;
