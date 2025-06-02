"use client";

import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Input,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
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

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Documentação", href: "/docs" },
  { label: "Preços", href: "/pricing" },
];

const menuItemsLogged = [
  { label: "Serviços", href: "/services" }, // Added a valid href
  { label: "Minhas Notas", href: "/notas" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Documentação", href: "/documentation" },
];

export function Navbar() {
  const matches = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAvatar = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { user, loading, Signout } = useAuth();

  const handleDrawerToggle = () => setOpen((prev) => !prev);

  if (loading) return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress color="success"/>
    </Box>
  )

  return (
    <Box sx={{
      display: loading ? "none" : "flex",
    }}>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          backgroundColor: "white",
          border: "1px solid #e2e2e2",
          color: "black",
        }}
      >
        <Toolbar sx={{ display: "flex", flexDirection: "row" }}>
          {matches ? (
            <>
              <IconButton onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={open} onClose={handleDrawerToggle}>
                <Box
                  sx={{
                    width: 250,
                    padding: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton onClick={handleDrawerToggle}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  {menuItems.map((item) => (
                    <Typography
                      key={item.href}
                      variant="h6"
                      component={Link}
                      href={item.href}
                      sx={{
                        textDecoration: "none",
                        color: "black",
                        padding: "10px 0",
                        ":hover": {
                          borderBottom: "1px solid black",
                        },
                      }}
                    >
                      {item.label}
                    </Typography>
                  ))}
                </Box>
              </Drawer>
            </>
          ) : (
            <IconButton sx={{ mr: 2 }}>
              <Image
                src={logo}
                width={80}
                height={70}
                alt="logo"
                quality={100}
              />
            </IconButton>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: matches ? "none" : "flex",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {user === null
              ? menuItems.map((item) => (
                  <Typography
                    key={item.href}
                    variant="h6"
                    component={Link}
                    href={item.href}
                    sx={{
                      textDecoration: "none",
                      color: "black",
                      ":hover": {
                        borderBottom: "1px solid black",
                      },
                    }}
                  >
                    {item.label}
                  </Typography>
                ))
              : null}
          </Box>

          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "34%",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <Input
                placeholder="Pesquisar..."
                color="success"
                sx={{
                  width: "320px",
                }}
                endAdornment={<Search sx={{ color: green500 }} />}
              />
              <NotificationsIcon
                sx={{
                  backgroundColor: green500,
                  color: "white",
                  width: "39px",
                  height: "39px",
                  padding: "5px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: '#0f9c6e',
                  },
                }}
              />
              <ButtonAuthorization
                Signout={Signout}
                anchorEl={anchorEl}
                handleClick={handleClick}
                handleClose={handleClose}
                openAvatar={openAvatar}
                user={user}
              />
            </div>
          ) : (
            <ButtonsNoAuthorization />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
