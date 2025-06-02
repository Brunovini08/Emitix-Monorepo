import { Box, Button } from "@mui/material";
import Link from "next/link";
import { green500 } from "../../utils/colors";

export function ButtonsNoAuthorization() {
  return (
    <Box display="flex" gap={1}>
    <Button
      color="inherit"
      variant="outlined"
      component={Link}
      href="/login"
      sx={{ borderColor: "#e2e2e2", color: green500 }}
    >
      Login
    </Button>
    <Button
      variant="contained"
      component={Link}
      href="/register"
      sx={{ backgroundColor: green500, color: "white" }}
    >
      Registrar
    </Button>
  </Box>
  )
}