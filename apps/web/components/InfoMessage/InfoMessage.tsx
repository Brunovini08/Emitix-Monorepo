import { Alert, AlertTitle, IconButton, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close"

interface InfoMessageProps {
  open: boolean;
  onClose: () => void;
  error: string;
  message: string;
}

export const InfoMessage = ({ open, onClose, error, message }: InfoMessageProps) => {
  const [openMessage, setOpenMesage] = useState(false);

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}
    >
      <Alert
        severity="error"
        icon={false}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>
          <Typography variant="h6">{error}</Typography>
        </AlertTitle>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};