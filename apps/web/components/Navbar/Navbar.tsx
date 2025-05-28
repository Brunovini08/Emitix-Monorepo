"use client";

import {
  AppBar,
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
import Menu from "@mui/icons-material/Menu";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export function Navbar() {
  const matches = useMediaQuery("(max-width: 600px)");
  const [open, setOpen] = useState(false);

  const {user} = useAuth()
  const handleDrawer = (prev: any) => {
    setOpen(!prev);
  };

  console.log(user)
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
        <Toolbar style={{ display: "flex", flexDirection: "row" }}>
          {matches ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                ":hover": {
                  backgroundColor: "white",
                },
              }}
              onClick={() => handleDrawer(open)}
            >
              <Drawer
                anchor="left"
                open={open}
                sx={{
                  display: matches ? "flex" : "none",
                  border: "1px solid black",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: "start",
                    flexDirection: "column",
                    gap: "8%",
                  }}
                >
                  <IconButton>
                    <CloseIcon onClick={() => handleDrawer(open)} />
                  </IconButton>

                  <Divider sx={{ mb: 2 }} />
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexDirection: "column",
                      padding: "10px",
                      gap: "10px",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        ":hover": {
                          borderBottom: "1px solid black",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Início
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        ":hover": {
                          borderBottom: "1px solid black",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Documentação
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        ":hover": {
                          borderBottom: "1px solid black",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Preços
                    </Typography>
                  </Box>
                </Box>
              </Drawer>
              <Menu />
              <Image
                src={logo}
                width={70}
                height={66}
                alt="logo"
                quality={100}
              />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{
                mr: 2,
                ":hover": {
                  backgroundColor: "white",
                },
              }}
            >
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
              gap: "8%",
            }}
          >
            <Box
              sx={{
                display: matches ? "none" : "flex",
                width: "100%",
                justifyContent: "center",
                gap: "2%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  ":hover": {
                    borderBottom: "1px solid black",
                    cursor: "pointer",
                  },
                }}
              >
                Início
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  ":hover": {
                    borderBottom: "1px solid black",
                    cursor: "pointer",
                  },
                }}
              >
                Documentação
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  ":hover": {
                    borderBottom: "1px solid black",
                    cursor: "pointer",
                  },
                }}
              >
                Preços
              </Typography>
            </Box>
          </Box>
          <Button
            color="inherit"
            sx={{
              border: "1px solid #e2e2e2",
              marginRight: "3px",
            }}
          >
            <Link href="/login" style={{
              textDecoration: 'none',
              color: 'rgb(16 185 129)'
            }}>Login</Link>
          </Button>
          <Button
            sx={{
              backgroundColor: "rgb(16 185 129)",
              color: "white",
              marginLeft: "3px",
            }}
          >
            <Link href="/register" style={{
              textDecoration: 'none',
              color: 'white'
            }}>REGISTRAR</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
