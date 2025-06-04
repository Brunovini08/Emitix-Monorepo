"use client";

import { Box, Button, Input, Typography, useMediaQuery } from "@mui/material";
import { useActionState, useEffect, useState } from "react";
import { signin } from "../actions/auth";
import type { FormState } from "../lib/definitions";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { green500 } from "../../utils/colors";
import { useRouter} from "next/navigation";

export default function Login() {
  const [state, action, pending] = useActionState<FormState, FormData>(
    async (state, formData) => {
      const result = await signin(state, formData);
      return {
        ...state,
        errors: result.errors || ({} as Record<string, string[]>),
        success: result.success || false,
        user: result.user || undefined,
      };
    },
    undefined
  );

  const router = useRouter();
  const [messages, setMessages] = useState<{ id: string; text?: string }[]>([]);
  const [count, setCount] = useState(0);
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };
  const generateId = () => {
    incrementCount();
    return `message-${count}`;
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (!state?.errors) return;

    const newMessages: { id: string; text: string }[] = [];

    if (typeof state.errors === "object" && !Array.isArray(state.errors)) {
      for (const [key, value] of Object.entries(state.errors)) {
        if (key === "message") {
          newMessages.push({
            id: generateId(),
            text: String(value),
          });
        }
      }
    } else if (Array.isArray(state.errors)) {
      state.errors.forEach((msg, i) => {
        newMessages.push({
          id: `msg-${i}`,
          text: String(msg),
        });
      });
    } else if (typeof state.errors === "string") {
      // Se for string direta
      newMessages.push({
        id: `error-string`,
        text: state.errors,
      });
    } else {
      // Fallback defensivo
      newMessages.push({
        id: "unknown-error",
        text: "Ocorreu um erro desconhecido.",
      });
    }

    setMessages(newMessages);
  }, [state?.errors]);

  useEffect(() => {
    if (state?.success) {
      router.push("/");
    }
  }, [state?.success]);

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
          message={msg.text || ""}
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
