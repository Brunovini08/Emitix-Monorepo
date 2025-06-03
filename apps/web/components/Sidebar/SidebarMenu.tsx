"use client";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Sidebar } from "react-mui-sidebar";
import HouseIcon from "@mui/icons-material/House";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "@mui/icons-material";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { green500 } from "../../utils/colors";

export const urls = [
  { url: "/", icon: <HouseIcon />, label: "dashboard" },
  { url: "/nfe", icon: <DescriptionIcon />, label: "NFE" },
  { url: "/nfce", icon: <PersonIcon />, label: "NFCe" },
  { url: "/cte", icon: <LocalShippingIcon />, label: "CTe" },
  { url: "/mdfe", icon: <InsertDriveFileIcon />, label: "MDFe" },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleCloseDrawer = () => setOpenDrawer(false);

  const content = (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: 150,
          lg: 220,
          xl: 250,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        pt: 2,
        pb: 2,
        px: {
          xs: 2,
          md: 0.8,
        },
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      {urls.map((item) => (
        <SidebarItem
          key={item.label}
          url={item.url}
          icon={item.icon}
          label={item.label}
          isActive={item.url === pathname}
        />
      ))}

      <Divider sx={{ width: "100%", my: 2, borderColor: "#e4e4e4" }} />

      {isMobile && (
        <Input
          placeholder="Pesquisar"
          sx={{
            width: "90%",
            mb: 2,
            borderRadius: 1,
            px: 2,
            py: 1,
            border: `1px solid ${green500}`,
          }}
          disableUnderline
          endAdornment={
            <Search sx={{ color: green500 }} style={{ cursor: "pointer" }} />
          }
        />
      )}
    </Box>
  );

  return isMobile ? (
    <>
      <IconButton
        onClick={() => setOpenDrawer(true)}
        sx={{ position: "absolute", top: 16, left: 10, zIndex: 1200 }}
        aria-label="Abrir menu lateral"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={openDrawer}
        onClose={handleCloseDrawer}
        anchor="left"
        ModalProps={{ keepMounted: true }}
      >
        <Box onClick={handleCloseDrawer} role="presentation">
          {content}
        </Box>
      </Drawer>
    </>
  ) : (
    <Sidebar showProfile={false}>{content}</Sidebar>
  );
}
