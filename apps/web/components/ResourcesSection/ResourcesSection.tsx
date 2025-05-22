"use client";

import { Chip, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CardResources } from "../CardResources/CardResources";
import DescriptionIcon from "@mui/icons-material/Description";

export function ResourcesSection() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "5%",
        width: {
          xs: "568px",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%"
        },
        flexDirection: "column",
        textAlign: {
          xs: "center",
        },
        gap: "10px",
        paddingBottom: "5%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          alignItems: {
            xs: "center",
            sm: "center",
            md: "center",
          },
        }}
      >
        <Chip
          sx={{
            backgroundColor: "rgb(16 185 129)",
            color: "white",
            width: "5rem",
          }}
          size="medium"
          label="Recursos"
        />
        <Typography variant="h4" fontWeight={"bold"}>
          Tudo que você precisa para gerenciar suas notas fiscais
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Emitix oferece uma solução completa para emissão e gerenciamento de
          documentos fiscais
        </Typography>
      </Box>
      <Box  
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          alignItems: {
            xs: "center",
            md: "center",
            sm: "center",
            lg: "center",
          },
          gap: {
            xs: "5%",
            sm: "5%",
            md: "5%",
            lg: "5%",
            xl: "5%",
          },
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          },
        }}
      >
        <CardResources
          icon={
            <DescriptionIcon
              sx={{
                color: "rgb(16 185 129)",
              }}
            />
          }
          primaryText={"NFE/NFC"}
          secondText={
            "Emita NFE/NFCE em segundos com nosso sistema intuitivo e eficiente"
          }
        />
        <CardResources
          icon={
            <DescriptionIcon
              sx={{
                color: "rgb(16 185 129)",
              }}
            />
          }
          primaryText={"MDF"}
          secondText={
            "Emita seu MDF em segundos com nosso sistema intuitivo e eficiente e seguro"
          }
        />
        <CardResources
          icon={
            <DescriptionIcon
              sx={{
                color: "rgb(16 185 129)",
              }}
            />
          }
          primaryText={"CTE"}
          secondText={
            "Emita seu CTE em segundos com nosso sistema intuitivo e eficiente e seguro"
          }
        />
      </Box>
    </Box>
  );
}
