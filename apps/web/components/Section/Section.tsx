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
      }}
    >
      <Grid
        size={{
          xl: 6,
          lg: 6,
          md: 12,
          sm: 12,
        }}
        sx={{
          paddingLeft: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            height: "100%",
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
                md: "start",
                lg: "start",
                xl: "start"
              },
              textAlign: {
                xs: "center",
                sm: "center",
                md: "start",
                lg: "start",
                xl: "start"
              }
            }}
          >
            <Button
              sx={{
                backgroundColor: "rgb(16 185 129)",
                color: "white",
                marginLeft: "3px",
              }}
            >
              Experimente
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
        </div>
      </Grid>
      <Grid
        size={{
          xl: 6,
          lg: 6,
          md: 12,
          sm: 12,
        }}
        sx={{
          display: "flex",
          paddingLeft: "1.6rem",
          placeContent: {
            sm: "center",
            md: "center"
          }
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
          }}
        />
      </Grid>
    </Grid>
  );
}
