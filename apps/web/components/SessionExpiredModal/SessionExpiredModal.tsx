'use client'

import { Box, Button, Modal, Typography } from "@mui/material";
import { useTokenMonitor } from "../../hooks/useTokenMonitor";
import { useRouter } from "next/navigation";
import { green500 } from "../../utils/colors";

export function SessionExpiredModal() {
  const sessionExpired = useTokenMonitor();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <Modal open={sessionExpired}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          p: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Sessão expirada
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Sua sessão expirou por inatividade. Faça login novamente.
        </Typography>
        <Button variant="contained" onClick={handleLogin} sx={{
          backgroundColor: green500
        }}>
          Ir para Login
        </Button>
      </Box>
    </Modal>
  );
}