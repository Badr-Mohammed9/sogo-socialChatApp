import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import { UserContext } from "./UserContext";
import { useContext, useState, useEffect } from "react";
import css from "../CSS/headr.module.css";
const pages = ["about", "settings", "contact"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const { userData, theme, setMode, setTheme } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userToken, setUserToken] = useState("");
  useEffect((el) => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken("");
    window.location.href = "/login";
  };

  const handleProfile = () => {
    window.location.href = "/profile/" + userData.id;
  };

  function getThemeIcon() {
    const modeChosen = localStorage.getItem("modeChosen");
    if (modeChosen === "dark") {
      return (
        <WbSunnyIcon
          onClick={(el) => {
            localStorage.setItem("modeChosen", "light");
            setTheme({
              primary: "white",
              secondry: "#F6F1F1",
              fonts: "#00ABB3",
              text: "black",
            });
          }}
        />
      );
    } else {
      return (
        <DarkModeIcon
          style={{ color: theme.fonts }}
          onClick={(el) => {
            localStorage.setItem("modeChosen", "dark");
            setTheme({
              primary: "#181818",
              secondry: "#272829",
              fonts: "#00ABB3",
              text: "white",
            });
          }}
        />
      );
    }
  }

  return (
    <AppBar style={{ backgroundColor: theme.primary }} position="static">
      <Container>
        <Toolbar disableGutters>
          <RateReviewOutlinedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: theme.text,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: theme.text,
              textDecoration: "none",
            }}
          >
            Sogo
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
            style={{color:theme.text}}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ color: 'black' }} textAlign="center">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <RateReviewOutlinedIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1,color:theme.text }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: theme.text,
              textDecoration: "none",
            }}
          >
            Sogo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block", color: theme.text }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            style={{ display: "flex", alignItems: "center" }}
            sx={{ flexGrow: 0 }}
          >
            <div className={css.themeIcon}>{getThemeIcon()}</div>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  sx={{ width: 48, height: 48 }}
                  alt="Remy Sharp"
                  src={userData.profile.image}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"profile"} onClick={handleProfile}>
                <Typography textAlign="center">{"profile"}</Typography>
              </MenuItem>
              <MenuItem key={"logout"} onClick={handleLogout}>
                <Typography textAlign="center">{"logout"}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
