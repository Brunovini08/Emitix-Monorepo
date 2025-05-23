"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import imageSection from "../../public/section.jpg";

export function Section() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        paddingTop: "5%",
        paddingBottom: "5%",
        width: "100%",
      }}
    >
      <Grid
        size={{
          xl: 6,
          lg: 5,
          md: 12,
          sm: 12,
        }}
        sx={{
          paddingBottom: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            textAlign: {
              xs: "center",
              sm: "center",
              md: "center",
              lg: "start",
              xl: "start",
            },
            height: "100%",
            paddingLeft: {
              xs: "",
              sm: "0",
              md: "0",
              lg: "30px",
              xl: "30px",
            },
            gap: "10px",
          }}
        >
          <Typography variant="h3" fontWeight={"bold"}>
            Emissão de notas fiscais simplificada
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Melhore seu desempenho com segurança e gerencie seus documentos
            fiscais com facilidade.
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: "5%",
              paddingTop: "1rem",
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "start",
                xl: "start",
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "start",
                lg: "start",
                xl: "start",
              },
            }}
          >
            <Button
              sx={{
                backgroundColor: "rgb(16 185 129)",
                color: "white",
                marginLeft: "3px",
              }}
            >
              Ver Emitix em Ação
            </Button>
            <Button
              sx={{
                border: "1px solid #e2e2e2",
                color: "black",
                marginRight: "3px",
              }}
            >
              Agendar Demonstração
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        size={{
          xl: 6,
          lg: 7,
          md: 12,
          sm: 12,
        }}
        sx={{
          width: "100%"
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Image
            src={imageSection}
            alt="Nota Fiscal"
            width={500}
            height={400}
            quality={100}
            style={{
              borderRadius: "10px",
              width: "50vw",
              height: "100%",
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
