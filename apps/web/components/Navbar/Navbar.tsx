"use client";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
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

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Documentação", href: "/docs" },
  { label: "Preços", href: "/pricing" },
];

export function Navbar() {
  const matches = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);

  const { user, loading, Signout } = useAuth();

  const handleDrawerToggle = () => setOpen((prev) => !prev);

  if (loading) return null; // ou um Skeleton/Spinner se preferir

  return (
    <Box>
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

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: matches ? "none" : "flex",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {menuItems.map((item) => (
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
            ))}
          </Box>

          {/* Auth Buttons */}
          {user ? (
            <Button variant="contained" color="error" onClick={Signout}>
              Sair
            </Button>
          ) : (
            <Box display="flex" gap={1}>
              <Button
                color="inherit"
                variant="outlined"
                component={Link}
                href="/login"
                sx={{ borderColor: "#e2e2e2", color: "rgb(16 185 129)" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                component={Link}
                href="/register"
                sx={{ backgroundColor: "rgb(16 185 129)", color: "white" }}
              >
                Registrar
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
