import { Box, Button, Typography } from "@mui/material";
import { green500 } from "../../../utils/colors";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function HeaderNfeForms() {
  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "100%",
      border: '1px solid black',
      margin: "0 auto",
      alignItems: "center",
      height: "20vh",
      backgroundColor: "#fff",
      py: '10px',
      px: '4px'
    }}
  > 
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        minWidth: "100%",
        maxWidth: 1200,
        height: '100%',
        backgroundColor: "#fff", 
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        width: "50%",
        height: "116px",
      }}>
        <Box sx={{
          width: "9%",
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}> 
          <Button 
            variant="contained"
            sx={{
              backgroundColor: green500, 
              color: "white",
              width: "100%",
              height: "40px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            <ArrowBackIcon />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: 2,
          }}
        >
        <Typography
          variant="h4"sx={{ color: "#000", fontWeight: "bold", }}>
          Nova NFe
          </Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "#000", fontWeight: "normal", marginBottom: 2 }}>
            Preencha os dados para emitir uma nova Nota Fiscal Eletrônica</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          alignItems: "start",
          width: "30%",
          gap: 2,
          height: "70px",
          
        }}
      >
        <Button 
          variant="contained"
          sx={{
            backgroundColor: "#FFF",
            color: green500,
            width: "59%",
            height: "40px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Salvar Rascunho
        </Button>

        <Button 
          variant="contained"
          sx={{
            backgroundColor: green500, 
            color: "white",
            width: "32%",
            height: "40px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          Emitir NFe
        </Button>
      </Box>
    </Box>
  </Box>
  )
}