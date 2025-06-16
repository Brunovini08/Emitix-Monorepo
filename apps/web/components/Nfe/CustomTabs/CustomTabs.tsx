// components/CustomTabs.tsx
"use client";

import React, { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

type TabItem = {
  label: string;
  content: React.ReactNode;
};

type CustomTabsProps = {
  tabs: TabItem[];
};

export function CustomTabs({ tabs }: CustomTabsProps) {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: "transparent", px: 2 }}>
      <Tabs
      textColor="inherit"
        value={value}
        onChange={handleChange}
        variant={isMobile ? "scrollable" : "standard"}
        scrollButtons={isMobile ? "auto" : false}
        allowScrollButtonsMobile
        sx={{
          backgroundColor: grey[200],
          borderRadius: 1,
          display: "flex",
          justifyContent: isMobile ? "flex-start" : "center",
          alignItems: "center",
          '& .MuiTab-root': {
            color: grey[600],
            textTransform: 'none',
            minWidth: isMobile ? 100 : 120,
            flexShrink: 0, // importante para scroll horizontal
          },
          '& .Mui-selected': {
            color: '#000',
            backgroundColor: 'white',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'transparent',
          },
          '& .MuiTouchRipple-root': {
            display: 'none',
          },
          '& .MuiTab-root:focus': {
            outline: 'none',
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            sx={{
              m: 0.5,
              borderRadius: 1,
            }}
          />
        ))}
      </Tabs>

      <Box mt={2}>
        {tabs[value]?.content}
      </Box>
    </Box>
  );
}
