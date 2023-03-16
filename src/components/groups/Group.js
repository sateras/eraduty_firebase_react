import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function Group({ primary, secondary }) {
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar alt="Profile Picture" />
      </ListItemAvatar>
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  );
}

export default Group;
