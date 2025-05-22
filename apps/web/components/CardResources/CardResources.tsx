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
          border: "1px solid #e1e1e1",
          display: "flex",
          padding: "4px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          
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
