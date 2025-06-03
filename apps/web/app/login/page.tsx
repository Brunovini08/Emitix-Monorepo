"use client";

import { Box, Button, Input, Typography, useMediaQuery } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { signin } from "../actions/auth";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { green500 } from "../../utils/colors";

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);
  const [messages, setMessages] = useState<{ id: string; text: string | undefined }[]>([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const newMessages = [];

    if (state?.errors?.email) {
      newMessages.push({
        id: "email",
        text: state.errors.email[0],
      });
    }

    if (Array.isArray(state?.errors?.password)) {
      state.errors.password.forEach((msg, idx) => {
        newMessages.push({
          id: `password-${idx}`,
          text: msg,
        });
      });
    }

    setMessages(newMessages);
    if (state?.success) window.location.href = "/";
  }, [state]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      {messages.map((msg) => (
        <InfoMessage
          key={msg.id}
          error="Erro"
          open={true}
          message={msg.text ? msg.text.replace(/""/g, " ") : ""}
          onClose={() =>
            setMessages((prev) => prev.filter((m) => m.id !== msg.id))
          }
        />
      ))}

      <Box
        sx={{
          width: isMobile ? "100%" : "50%",
          maxWidth: 500,
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 4,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
          action={action}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            align="center"
            sx={{ color: green500 }}
          >
            Emitix Login
          </Typography>

          <Input
            name="email"
            placeholder="Email"
            fullWidth
            type="email"
            color="success"
          />

          <Input
            name="password"
            placeholder="Senha"
            fullWidth
            type="password"
            color="success"
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: green500,
              mt: 1,
            }}
            type="submit"
            disabled={pending}
          >
            {pending ? "Entrando..." : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  );
}
