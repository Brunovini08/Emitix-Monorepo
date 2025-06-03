"use client";

import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Input,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import logo from "../../public/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { ButtonsNoAuthorization } from "./ButtonsNoAuthorization";
import { ButtonAuthorization } from "./ButtonAuthorization";
import { green500 } from "../../utils/colors";
import { Search } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const menuItemsGuest = [
  { label: "Início", href: "/" },
  { label: "Documentação", href: "/docs" },
  { label: "Preços", href: "/pricing" },
];

export function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user, loading, Signout } = useAuth();

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: "#fff",
          borderBottom: "1px solid #e2e2e2",
          color: "black",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {!isMobile && user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={100}
                  quality={100}
                />
              </Link>
            </Box>
          )}
          {isMobile && user && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "90%",
                justifyContent: "space-between",
                marginLeft: "auto",
              }}
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  width={80}
                  height={70}
                  quality={100}
                />
              </Link>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton>
                  <NotificationsIcon sx={{ color: green500 }} />
                </IconButton>
                <ButtonAuthorization
                  user={user}
                  Signout={Signout}
                  handleClick={handleClick}
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  openAvatar={false}
                />
              </Box>
            </Box>
          )}

          {!isMobile && user && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                backgroundColor: "white",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Input
                  placeholder="Pesquisar..."
                  disableUnderline
                  sx={{
                    border: `1px solid ${green500}`,
                    borderRadius: 1,
                    padding: 1,
                    width: "300px",
                  }}
                  endAdornment={
                    <Search
                      sx={{ color: green500 }}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                  }
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton
                  aria-label="notifications"
                  sx={{
                    ml: 1,
                    ":hover": { color: "white" },
                  }}
                >
                  <NotificationsIcon sx={{ color: green500 }} />
                </IconButton>
                <ButtonAuthorization
                  user={user}
                  Signout={Signout}
                  handleClick={handleClick}
                  handleClose={handleClose}
                  anchorEl={anchorEl}
                  openAvatar={false}
                />
              </Box>
            </Box>
          )}

          {/* Links de menu central (desktop) */}
          {!isMobile && !user && (
            <Box
              sx={{
                display: "flex",
                gap: "30px",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Link href="/">
                <Image
                  src={logo}
                  alt="logo"
                  width={80}
                  height={70}
                  quality={100}
                />
              </Link>
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  alignItems: "center",
                  height: "100%",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "30px",
                    justifyContent: "center",
                    width: "67%",
                    paddingLeft: "16%",
                  }}
                >
                  {menuItemsGuest.map((item) => (
                    <Typography
                      key={item.href}
                      variant="h6"
                      component={Link}
                      href={item.href}
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        ":hover": {
                          borderBottom: `2px solid ${green500}`,
                        },
                        height: "30px",
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    width: "23%",
                    justifyContent: "end",
                  }}
                >
                  <ButtonsNoAuthorization />
                </Box>
              </Box>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {!user && isMobile && (
        <>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1200,
            }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
            <Box sx={{ width: 250, p: 2 }}>
              <Box display="flex" justifyContent="flex-end">
                <IconButton onClick={handleDrawerToggle}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Divider sx={{ my: 2 }} />
              {menuItemsGuest.map((item) => (
                <Typography
                  key={item.href}
                  variant="h6"
                  component={Link}
                  href={item.href}
                  sx={{
                    textDecoration: "none",
                    color: "black",
                    display: "block",
                    py: 1,
                    ":hover": {
                      borderBottom: "1px solid black",
                    },
                  }}
                  onClick={handleDrawerToggle}
                >
                  {item.label}
                </Typography>
              ))}
              <Divider sx={{ my: 2 }} />
              {!user && <ButtonsNoAuthorization />}
            </Box>
          </Drawer>
        </>
      )}
    </Box>
  );
}
