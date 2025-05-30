import Description from "@mui/icons-material/Description";

import { Box, Typography } from "@mui/material";

export function Footer() {
  const getYear = new Date().getFullYear();

  return (
    
    <Box
      sx={{
        display: "flex",
        position:  'static',
        bottom  : '0',
        width: "100%",
        borderTop: '1px solid #e4e4e4',
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "15px",
        paddingRight: "15px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "50%",
          height: "10vh",
          alignItems: "center",
          flexDirection: {
            xs: "row",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
          },
        }}
      >
        <Description
          sx={{
            color: "rgb(16 185 129)",
          }}
        />
        <Typography>{getYear} Emitix. Todos direitos reservados.</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          paddingTop: {
            xs: "3%",
            sm: "3%",
            md: "0%",
            lg: "0%",
            xl: "0%"
          },
          width: "50%",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          },
          justifyContent: "end",
          alignItems: {
            xs: "end"
          },
          gap: "5%",
        }}
      >
        <Typography variant="subtitle2" color="textSecondary">
          Termos de Serviço
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Política de Privacidade
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Contato
        </Typography>
      </Box>
    </Box>
  );
}
