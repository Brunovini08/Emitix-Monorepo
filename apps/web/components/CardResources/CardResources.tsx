"use client";
import { Box, Card, Container, Typography } from "@mui/material";
import React from "react";

interface ICardResourcesProps {
  icon: React.ReactNode;
  primaryText: string;
  secondText: string;
}

export function CardResources({
  icon,
  primaryText,
  secondText,
}: ICardResourcesProps) {
  return (
      <Card
        sx={{
          maxWidth: "300px",
          minHeight: "200px",
          borderRadius: '6px',
          display: "flex",
          padding: "4px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          ":hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease"
          }
        }}
      >
        {icon}
        <Typography variant="h5" fontWeight={"bold"} color="black">
          {primaryText}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {secondText}
        </Typography>
      </Card>
  );
}
