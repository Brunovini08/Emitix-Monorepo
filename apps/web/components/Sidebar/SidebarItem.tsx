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
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Link href={url} passHref style={{ textDecoration: "none", width: "100%" }}>
        <Button
          sx={{
            width: "100%", 
            maxWidth: "250px", 
            minWidth: "150px", 
            textTransform: "none",
            borderRadius: 2,
            fontSize: "1rem", 
            fontWeight: "bold",
            height: "48px",
            padding: "10px 16px",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "8px",
            backgroundColor: isActive ? "#e1e1e1" : "transparent",
            color: green500,
            ":hover": {
              backgroundColor: "#e1e1e1",
            },
          }}
          aria-current={isActive ? "page" : undefined}
        >
          {icon}
          <Typography component="span" noWrap>
            {label}
          </Typography>
        </Button>
      </Link>
    </Box>
  );
}
