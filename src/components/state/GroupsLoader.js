import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";

function GroupsLoader() {
  return (
    <>
      <ListItem button>
        <ListItemAvatar>
          <Skeleton
            animation="wave"
            variant="circular"
            width={41}
            height={41}
          />
        </ListItemAvatar>
        <div style={{ width: 200 }}>
          <Skeleton
            animation="wave"
            height={13}
            width="30%"
            style={{ marginBottom: 7, marginTop: 9 }}
          />
          <Skeleton
            animation="wave"
            height={13}
            width="100%"
            style={{ marginBottom: 7 }}
          />
        </div>
      </ListItem>

      <ListItem button>
        <ListItemAvatar>
          <Skeleton
            animation="wave"
            variant="circular"
            width={41}
            height={41}
          />
        </ListItemAvatar>
        <div style={{ width: 200 }}>
          <Skeleton
            animation="wave"
            height={13}
            width="30%"
            style={{ marginBottom: 7, marginTop: 9 }}
          />
          <Skeleton
            animation="wave"
            height={13}
            width="100%"
            style={{ marginBottom: 7 }}
          />
        </div>
      </ListItem>
      <ListItem button>
        <ListItemAvatar>
          <Skeleton
            animation="wave"
            variant="circular"
            width={41}
            height={41}
          />
        </ListItemAvatar>
        <div style={{ width: 200 }}>
          <Skeleton
            animation="wave"
            height={13}
            width="30%"
            style={{ marginBottom: 7, marginTop: 9 }}
          />
          <Skeleton
            animation="wave"
            height={13}
            width="100%"
            style={{ marginBottom: 7 }}
          />
        </div>
      </ListItem>
    </>
  );
}

export default GroupsLoader;
