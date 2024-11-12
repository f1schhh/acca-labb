"use client";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DraftsIcon from "@mui/icons-material/Drafts";
import ArchiveIcon from "@mui/icons-material/Archive";
import CreateIcon from "@mui/icons-material/Create";
import HomeIcon from "@mui/icons-material/Home";
import { usePathname } from "next/navigation";
import ApplicationDialog from "./ApplicationDialog";
import { useState } from "react";
import { useApplications } from "../../app/(logged-in)/dashboard/ApplicationsContext";

export default function SideBar() {
  const pathname = usePathname();
  const { refreshApplications } = useApplications();
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
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
        <ListItemButton
          href="/dashboard"
          selected={pathname === "/dashboard"}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          href="/dashboard/applications/page/1"
          selected={pathname?.startsWith("/dashboard/applications")}
        >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItemButton>
        <ListItemButton
          href="/dashboard/archived/page/1"
          selected={pathname?.startsWith("/dashboard/archived")}
        >
          <ListItemIcon>
            <ArchiveIcon />
          </ListItemIcon>
          <ListItemText primary="Archived" />
        </ListItemButton>
        <ListItemButton onClick={handleOpenDialog}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Create a application" />
        </ListItemButton>
      </List>
      <ApplicationDialog
        applicationType="create"
        open={openDialog}
        onClose={handleCloseDialog}
        onAction={() => {
          handleCloseDialog();
          refreshApplications();
        }}
        title="Create Application"
      />
    </>
  );
}
