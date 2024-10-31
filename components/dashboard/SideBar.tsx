"use client";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DraftsIcon from "@mui/icons-material/Drafts";
import ArchiveIcon from "@mui/icons-material/Archive";
import CreateIcon from "@mui/icons-material/Create";

export default function SideBar() {
  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
        >
          Dashboard
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Ongoing applications" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Archived" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary="Create a application" />
      </ListItemButton>
    </List>
  );
}
