"use client";

import { Box, Button, Input, Typography } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { signin } from "../actions/auth";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";

export default function Login() {
  const [state, action, pending] = useActionState(signin, undefined);
  
  const [messages, setMessages] = useState<
    { id: string; text: string | undefined }[]
  >([]);

  // Quando houver erros, atualize `messages`
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
    state?.success ? window.location.href = "/inicio" : null
  }, [state]);


  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid black",
        }}
      >
        <form
          style={{
            width: "75%",
            height: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
          action={action}
        >
          <Typography variant="h2" color="success">
            Emitix Login
          </Typography>
          <Input
            name="email"
            placeholder="Email"
            sx={{
              width: "40%",
            }}
            color="success"
            type={"email"}
          />
          <Input
            name="password"
            placeholder="Senha"
            sx={{
              width: "40%",
            }}
            type={"password"}
            color="success"
          />
          <Button
            variant="contained"
            color="success"
            sx={{
              width: "30%",
            }}
            type="submit"
            disabled={pending}
          >
            {pending ? "Entrando..." : "Login"}
          </Button>
        </form>
      </Box>
    </div>
  );
}
