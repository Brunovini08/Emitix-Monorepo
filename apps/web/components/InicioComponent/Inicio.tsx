"use client";

import { Grid, Box, Typography, useMediaQuery, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return !user ? (
    <>
      <Section />
      <ResourcesSection />
    </>
  ) : (
    <Grid container>
      <Grid
        container
        size={isMobile ? 0 : 2}
        sx={{
          display: { xs: "fixed", md: "flex", lg: "block" },
          position: { xs: "absolute", md: "static", lg: "static" },
          top: 0,
          left: 0,
        }}
      >
        <SidebarMenu />
      </Grid>

      {/* Conteúdo principal */}
      <Grid
        size={isMobile ? 12 : 10}
        sx={{
          backgroundColor: "#f6f6f6",
          padding: 2,
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: green500 }}>
            Bem-vindo, {user?.name || "Usuário"}!
          </Typography>
          <Typography variant="body1" sx={{ color: "#555" }}>
            Gerencie suas emissões fiscais de forma simples e eficiente.
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
            minHeight: "calc(100vh - 120px)",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
