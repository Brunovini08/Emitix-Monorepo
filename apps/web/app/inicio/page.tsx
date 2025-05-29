'use client'

import { Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function Inicio() {
  const { user } = useAuth();

  return (
    <div>
      <Typography>{user?.name}</Typography>
    </div>
  );
}
