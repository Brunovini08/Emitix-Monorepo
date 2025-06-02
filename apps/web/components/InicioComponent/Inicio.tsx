"use client";

import { Grid, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import SidebarMenu from "../Sidebar/SidebarMenu";
import { green500 } from "../../utils/colors";
import { Section } from "../Section/Section";
import { ResourcesSection } from "../ResourcesSection/ResourcesSection";

interface InicioProps {
  children?: React.ReactNode;
}

export default function Inicio({ children }: InicioProps) {
  const { user } = useAuth();

  return !user ? (
    <>
      <Section />
      <ResourcesSection />
    </>
  ) : (
    <Grid container>
      <Grid
        container
        size={2}
        sx={{
          borderRight: "1px solid #e4e4e4",
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <SidebarMenu />
      </Grid>

      <Grid
        size={10}
        sx={{
          backgroundColor: "#f6f6f6",
          padding: 2,
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: green500 }}>
            Bem-vindo, {user?.name || "Usuário"}!
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: 3,
            minHeight: "calc(100vh - 120px)", // ajuste conforme altura do topo e footer
            boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
