"use client";

import {
  Description,
  GraphicEq,
  Money,
  LocalAtm,
  LocalShipping,
  LocationOn,
} from "@mui/icons-material";
import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { green500 } from "../utils/colors";
import { DatagridCustom } from "../components/Datagrid/DatagridCustom";
import { useTheme } from "@mui/material";
import Link from "next/link";

const items = [
  {
    title: "Total Emitido",
    value: "R$ 0,00",
    icon: <Money />,
  },
  {
    title: "Documentos",
    value: "0",
    icon: <Description />,
  },
  {
    title: "Taxa de Sucesso",
    value: "0%",
    icon: <GraphicEq />,
  },
  {
    title: "API Calls",
    value: "0",
    icon: <GraphicEq />,
  },
];

const tiposNotas = [
  {
    title: "NFe",
    description: "Nota Fiscal Eletrônica",
    icon: <Description />,
    button: (
      <Link href={"/nfe-emitir"} passHref>
          <Button
        variant="outlined"
        sx={{
          backgroundColor: green500,
          color: "white",
          borderColor: green500,
          width: "100%",
          mt: 2.6,
        }}
      >
        Emitir Nota
      </Button>
      </Link>
    ),
  },
  {
    title: "NFCe",
    description: "Nota Fiscal de Consumidor Eletrônica",
    icon: <LocalAtm />,
    button: (
      <Link href={"/nfce-emitir"} passHref>
        <Button
        variant="outlined"
        sx={{
          backgroundColor: green500,
          color: "white",
          borderColor: green500,
          width: "100%",
        }}
      >
        Emitir NFCe
      </Button>
      </Link>
    ),
  },
  {
    title: "CTe",
    description: "Conhecimento de Transporte Eletrônico",
    icon: <LocalShipping />,
    button: (
      <Link href="/cte-emitir" passHref>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: green500,
            color: "white",
            borderColor: green500,
            width: "100%",
          }}
        >
          Emitir CTe
        </Button>
      </Link>
    ),
  },
  {
    title: "MDFe",
    description: "Manifesto Eletrônico de Documentos Fiscais",
    icon: <LocationOn />,
    button: (
      <Link href="/mdfe-emitir" passHref>
        <Button
          variant="outlined"
          sx={{
            backgroundColor: green500,
            color: "white",
            borderColor: green500,
            width: "100%",
          }}
        >
          Emitir MDF-e
        </Button>
      </Link>
    ),
  },
];

export default function Home() {
  const theme = useTheme();
  const matcher = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {items.map((item, index) => (
          <Grid size={matcher ? 6 : 3} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 2,
                borderRadius: 1,
                border: "1px solid #e2e2e2",
                backgroundColor: "#fff",
                height: "100%",
              }}
            >
              <Box sx={{ textAlign: "start", height: "100%" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#000", fontWeight: "bold" }}
                >
                  {item.title}
                </Typography>
                <Typography variant="h6" sx={{ color: green500 }}>
                  {item.value}
                </Typography>
              </Box>
              <Box
                sx={{
                  color: green500,
                  height: "100%",
                  display: "flex",
                }}
              >
                {item.icon}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {tiposNotas.map((nota, index) => (
          <Grid size={matcher ? 6 : 3} key={index}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                borderRadius: 1,
                border: "1px solid #e2e2e2",
                backgroundColor: "#fff",
                height: "100%",
              }}
            >
              <Box sx={{ color: green500, fontSize: 40 }}>{nota.icon}</Box>
              <Typography
                variant="subtitle1"
                sx={{ color: "#000", fontWeight: "bold", marginTop: 1 }}
              >
                {nota.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#555",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textAlign: "center",
                }}
              >
                {nota.description}
              </Typography>
             {nota.button}  
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: 3,
          minHeight: "calc(100vh - 120px)",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: 2,
            gap: 1,
            padding: 2,
            borderBottom: "1px solid #e2e2e2",
            marginLeft: 1,
            marginRight: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: green500,
              fontSize: "1.5rem",
              marginBottom: 0.5,
              marginTop: 0,
            }}
          >
            Documentos Recentes
          </Typography>
          <Typography
            sx={{
              color: "#555",
              fontSize: "0.9rem",
              marginBottom: 0,
              marginTop: 0,
              fontWeight: "normal",
              lineHeight: 1.5,
              maxWidth: "600px",
              textAlign: "left",
              marginLeft: 1,
              marginRight: 1,
            }}
          >
            Últimas emissões realizadas
          </Typography>
        </Box>
        <DatagridCustom />
      </Box>
    </Box>
  );
}
