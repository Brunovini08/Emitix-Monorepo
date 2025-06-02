import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { green500 } from "../../utils/colors";
interface SidebarItemProps {
  url: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

export default function SidebarItem({
  url,
  icon,
  label,
  isActive,
}: SidebarItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "5px",
        width: "100%",
        justifyContent: "center",
        marginBottom: "10px",
      }}
    >
      <Button
        sx={{
          width: "90%",
          color: { green500 },
          textTransform: "none",
          borderRadius: "8px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          height: "50px",
          display: "flex",
          backgroundColor: isActive ? "#e1e1e1" : "transparent",
          justifyContent: "start",
          padding: "10px 15px",
          alignItems: "center",
          ":hover": {
            backgroundColor: "#e1e1e1",
          },
        }}
      >
        <Link
          href={url}
          style={{
            textDecoration: "none",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            color: green500,
          }}
        >
          {icon}
          <Typography
            sx={{
              fontSize: "16px",
              marginLeft: "10px",
            }}
          >
            {label}
          </Typography>
        </Link>
      </Button>
    </Box>
  );
}
