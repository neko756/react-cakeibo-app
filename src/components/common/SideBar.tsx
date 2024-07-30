import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from "react-router-dom";
import { CSSProperties } from "react";
interface SideBarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

interface menuItem {
  text: string,
  path:string,
  icon: React.ComponentType
}

const SideBar = ({
  drawerWidth,
  mobileOpen,
  handleDrawerClose,
  handleDrawerTransitionEnd,
}: SideBarProps) => {

  const menuItems : menuItem [] = [{text: "Home",path: "/",icon:HomeIcon},
   { text: "Report",path: "/report",icon:EqualizerIcon}
  ]
  const activeLinkStyle : CSSProperties = {
    backgroundColor:"rgba(0,0,0,0.08)"
  }

  const baseLinkStyle :CSSProperties = {
    textDecoration:"none",
    color:"inherit",
    display:"block"


  }
  
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
      {menuItems.map((menuItem, index) => (
        <NavLink key={index} to={menuItem.path} style={({isActive}) => {

          return {...baseLinkStyle,...(isActive?activeLinkStyle:{})}
        }}>
          <ListItem key={index} disablePadding>
            <ListItemButton>
              <ListItemIcon>
               <menuItem.icon />
              </ListItemIcon>
              <ListItemText primary={menuItem.text} />
            </ListItemButton>
          </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* モバイル用 */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      {/* pc */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideBar;
