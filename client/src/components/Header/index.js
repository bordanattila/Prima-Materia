import * as React from "react";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Auth from "../../utils/auth";

const drawerWidth = 240;
const navItems = ["Home", "Search", "Decks", "Wishlist", "Mystery Card"];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // drawer navigation for small viewports
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2, fontFamily: "sans-serif", letterSpacing: ".3rem" }}
      >
        Prima Materia
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              href={"/" + item.replace(/\s/g, "").toLowerCase()}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
        {Auth.loggedIn() ? (
          <>
            <ListItem key="Logout" disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                href="home"
                onClick={Auth.logout}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem key="Login" disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} href="login">
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  // chsck to see if script is being run in the web-page
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" style={{ background: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontFamily: "sans-serif",
              letterSpacing: ".4rem",
            }}
          >
            Prima Materia
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* creates a clickable navigation item that reroutes the page based on the navItems. Removes spaces and and makes all letters to lowercase for route */}
            {navItems.map((item) => (
              <Link
                key={item}
                sx={{ color: "#fff", paddingLeft: "1.5rem" }}
                underline="none"
                href={"/" + item.replace(/\s/g, "").toLowerCase()}
              >
                {item.toUpperCase()}
              </Link>
            ))}
            {/* checks if a user is logged in or not to display either LOGIN or LOGOUT in Nav */}
            {Auth.loggedIn() ? (
              <Link
                key="Logout"
                sx={{ color: "#fff", paddingLeft: "1.5rem" }}
                underline="none"
                href="home"
                onClick={Auth.logout}
              >
                LOGOUT
              </Link>
            ) : (
              <Link
                key="Login"
                sx={{ color: "#fff", paddingLeft: "1.5rem" }}
                underline="none"
                href="login"
              >
                LOGIN
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
      </Box>
    </Box>
  );
}

export default Header;
