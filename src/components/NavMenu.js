import * as React from "react";
import "../styles/navmenu.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import MenuIcon from "@mui/icons-material/Menu";
import PanToolIcon from "@mui/icons-material/PanTool";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, logout } from "../redux/auth/authSlice";
import { useGoogleLogin } from "react-use-googlelogin";
import { Button } from "@mui/material";

export const drawerWidth = 240;

function NavMenu(props) {
  //State >>
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { signOut } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });

  const handleSignOut = async () => {
    const googleUser = await signOut(); // if you need immediate access to `googleUser`, get it from signIn() directly
    if (googleUser) {
      dispatch(logout());
      navigate("");
    } else {
      console.error("Sign-out error");
    }
  };
  //Constants >>
  const { window } = props;
  const auth = useSelector(getAuth);
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const drawer = (
    <div>
      <Toolbar />
      {auth.authenticated ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("")}>
              <ListItemIcon>{<BusinessIcon />}</ListItemIcon>
              <ListItemText primary={"Companies"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("dragdrop")}>
              <ListItemIcon>{<PanToolIcon />}</ListItemIcon>
              <ListItemText primary={"Drag & Drop"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("showmoretext")}>
              <ListItemIcon>{<ReadMoreIcon />}</ListItemIcon>
              <ListItemText primary={"Show More Text"} />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("")}>
              <ListItemIcon>{<HomeIcon />}</ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </div>
  );

  //Hooks >>
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Functions >>
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Box component={"div"} className="toolbar-container">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography noWrap component="div">
                Menadzment Kompanija
              </Typography>
            </Box>
            {auth.authenticated && (
              <Button
                onClick={handleSignOut}
                variant="contained"
                color="info"
                size="medium"
              >
                Sign Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="drawer-nav"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default NavMenu;
