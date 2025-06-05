'use client'

import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from "next/navigation";
import { green500 } from "../../../utils/colors";

export function HeaderNfeForms() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // até 600px

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: 'end',
        alignItems: "center",
        height: isMobile ? "auto" : "12vh",
        backgroundColor: "#f6f6f6",
        py: isMobile ? 2 : 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "start",
          width: "100%",
          maxWidth: "100%",
          px: 2,
          gap: isMobile ? 2 : 0,
        }}
      >
        {/* Esquerda: Título e botão voltar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            width: isMobile ? "100%" : "50%",
            gap: 2,
          }}
        >
          {/* Botão voltar */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: green500,
              color: "white",
              height: "40px",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: 'none',
              minWidth: 40,
              width: isMobile ? "auto" : 40,
            }}
            onClick={handleBack}
          >
            <ArrowBackIcon />
          </Button>

          {/* Títulos */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ color: "#000", fontWeight: "bold" }}
            >
              Nova NFe
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: "gray",
                fontWeight: "normal",
              }}
            >
              Preencha os dados para emitir uma nova Nota Fiscal Eletrônica
            </Typography>
          </Box>
        </Box>

        {/* Direita: Botão Emitir */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "end",
            width: isMobile ? "100%" : "11%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: green500,
              color: "white",
              fontSize: isMobile ? "12px" : "12px",
              fontWeight: "bold",
              boxShadow: 'none',
              gap: 1,
              height: 40,
              width: isMobile ? "100%" : "100%",
              minWidth: 120,
            }}
            fullWidth={isMobile}
          >
            <SendIcon />
            Emitir NFe
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
