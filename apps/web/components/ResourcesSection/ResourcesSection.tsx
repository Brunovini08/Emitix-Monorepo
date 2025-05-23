"use client";

import { Chip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CardResources } from "../CardResources/CardResources";
import DescriptionIcon from "@mui/icons-material/Description";

export function ResourcesSection() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "3%",
        paddingTop: "5%",
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "100%",
          xl: "100%",
        },
        height: "100%",
        flexDirection: "column",
        textAlign: {
          xs: "center",
        },
        gap: "10px",
        paddingBottom: {
          xs: "5%",
          sm: "5%",
          md: "0%",
          lg: "0%",
          xl: "0%",
        },
        backgroundColor: "rgb(16 185 129)",
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
          gap: "4px",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={"bold"}
          style={{
            color: "#f1f1f1",
            textDecoration: "underline",
            textUnderlineOffset: "8px",
          }}
        >
          Tudo que você precisa para gerenciar suas notas fiscais
        </Typography>
        <Typography
          variant="h6"
          style={{
            color: "#e6e6e6",
          }}
        >
          Emitix oferece uma solução completa para emissão e gerenciamento de
          documentos fiscais
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          paddingBottom: {
            xs: "5%",
            sm: "5%",
            md: "5%",
            lg: "5%",
            xl: "0%",
          },
          paddingTop: {
            xs: "5%",
            sm: "5%",
            md: "0%",
            lg: "0%",
            xl: "0%",
          },
          justifyContent: {
            xs: "space-around",
            sm: "space-around",
            md: "space-around",
            lg: "center",
          },
          width: "100%",
          alignItems: {
            xs: "center",
            md: "center",
            sm: "center",
            lg: "center",
          },
          gap: {
            xs: "30px",
            sm: "30px",
            md: "30px",
            lg: "30px",
            xl: "30px",
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
