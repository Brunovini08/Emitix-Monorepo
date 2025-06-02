import Description from "@mui/icons-material/Description";
import { Box, Typography, Link as MuiLink } from "@mui/material";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        borderTop: "1px solid #e4e4e4",
        paddingY: 2,
        paddingX: 3,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        justifyContent: "space-between",
        alignItems: {
          xs: "flex-start",
          md: "center",
        },
        gap: {
          xs: 1,
          md: 0,
        },
      }}
    >
      {/* Esquerda */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Description sx={{ color: "rgb(16 185 129)" }} />
        <Typography variant="body2" color="text.secondary">
          © {currentYear} Emitix. Todos os direitos reservados.
        </Typography>
      </Box>

      {/* Direita */}
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
        }}
      >
        {["Termos de Serviço", "Política de Privacidade", "Contato"].map((text, i) => (
          <MuiLink
            key={i}
            href="#"
            variant="body2"
            underline="hover"
            color="text.secondary"
          >
            {text}
          </MuiLink>
        ))}
      </Box>
    </Box>
  );
}
