"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import HouseIcon from "@mui/icons-material/House";
import { Logo, Menu, MenuItem, Sidebar, Submenu } from "react-mui-sidebar";

export default function Inicio() {
  const { user } = useAuth();

  return (
    <Grid container>
      <Grid
        size={2}
      >
        <Sidebar width={"227px"} showProfile={false}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              paddingRight: '10px',
              paddingTop: '10px',
              justifyContent: "center",
              alignItems: "start",
              borderRight: "1px solid #e4e4e4",
              height: "76vh",
            }}
          >
            <Button
              sx={{
                color: "rgb(16 185 129)",
                width: "90%",
                gap: "3px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <HouseIcon
                sx={{
                  color: "rgb(16 185 129)",
                }}
              />
              <Typography
                sx={{
                  color: "rgb(16 185 129)",
                }}
              >
                Dashboard
              </Typography>
            </Button>
          </Box>
        </Sidebar>
      </Grid>
      <Grid
        size={10}
        sx={{
          backgroundColor: '#e1e1e1',
          border: 'none',
          padding: 'none'
        }}
      >
      </Grid>
    </Grid>
  );
}
