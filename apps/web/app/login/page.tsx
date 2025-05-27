"use client";

import { Alert, Box, Button, Input, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, type FormEvent } from "react";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const [formLogin, setFormLogin] = useState<ILogin>({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setFormLogin({
      email: (formData.get("email") as string)
        ? (formData.get("email") as string)
        : "",
      password: (formData.get("password") as string)
        ? (formData.get("password") as string)
        : "",
    });

    const response = await fetch("https://emitix.com.br/auth/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formLogin),
    });

    let result
    try {
      result = await response.json()
      console.log(result)
    } catch (error) {
      result = { message: 'Erro inesperado no servidor'}
    }

    if (response.ok) {
      setAlert({ type: "success", message: "Logado com sucesso!" });
    } else {
      setAlert({
        type: "error",
        message: result?.message || "Erro ao fazer login.",
      });
      
    }

  }

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
      {alert && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          zIndex: '50px'
        }}>
          <Alert severity={alert.type}>{alert.message}</Alert>  
        </div>
      )}
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
          onSubmit={handleSubmit}
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
          >
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
}
