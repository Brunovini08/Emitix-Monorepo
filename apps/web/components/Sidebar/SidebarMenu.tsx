"use client";

import { Box, Divider } from "@mui/material";
import { Sidebar } from "react-mui-sidebar";
import HouseIcon from "@mui/icons-material/House";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const urls = [
  {
    url: "/",
    icon: <HouseIcon />,
    label: "dashboard",
  },
  {
    url: "/nfe",
    icon: <DescriptionIcon />,
    label: "NFE",
  },
  {
    url: "/nfce",
    icon: <PersonIcon />,
    label: "NFCe",
  },
  {
    url: "/cte",
    icon: <LocalShippingIcon />,
    label: "CTe",
  },
  {
    url: "/mdfe",
    icon: <InsertDriveFileIcon />,
    label: "MDFe",
  },
];

export default function SidebarMenu() {
  const pathname = usePathname();
  return (
    <Sidebar width="227px" showProfile={false}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          paddingTop: "10px",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          borderRight: "1px solid #e4e4e4",
        }}
      >
        {urls.map((item, index) => (
          <SidebarItem
            key={index}
            url={item.url}
            icon={item.icon}
            label={item.label}
            isActive={item.url === pathname}
          />
        ))}
        <Divider
          sx={{
            width: "100%",
            marginTop: "10px",
            marginBottom: "10px",
            borderColor: "#e4e4e4",
            borderWidth: "1px",
            borderStyle: "solid",
          }}
        />
      </Box>
    </Sidebar>
  );
}
