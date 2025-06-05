'use client'

import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { green500 } from "../../../utils/colors";

interface CustomTabsProps {
  quantity?: number;
  value?: number;
  onChange?: (event: React.SyntheticEvent, newValue: number) => void;
  labels: string[]
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export function CustomTabs({onChange, quantity, value, labels}: CustomTabsProps) {

  const [valueProp, setValueProp] = useState(value || 0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueProp(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Box 
      sx={{
        
      }}
    >
     <Box>
      <Tabs value={valueProp} onChange={handleChange}
        scrollButtons
        sx={{
          backgroundColor: '#f5f5f5',
          p: 1,
          '& .MuiTab-root': {
            color: 'black',
            textTransform: 'none',
          },
          '& .Mui-selected': {
            color: 'black', // remove texto azul
            backgroundColor: 'white', // opcional: fundo ao selecionar
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'transparent', // remove a linha azul inferior
          },
          '& .MuiTouchRipple-root': {
            display: 'none', // remove o ripple azul ao clicar
          },
          '& .MuiTab-root:focus': {
            outline: 'none', // remove contorno de foco
          },
        }}
      >
        {quantity && Array.from({ length: quantity }, (_, i) => (
          <Tab
            key={i}
            label={labels[i] || `Tab ${i + 1}`}
            {...a11yProps(i)}
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              color: green500,
              textTransform: "none",
              minWidth: "120px",
            }}
          />
        ))}
      </Tabs>
      {Array.from({ length: quantity || 0 }, (_, i) => (
        <CustomTabPanel key={i} value={valueProp} index={i}>
          {`Content for ${labels[i] || `Tab ${i + 1}`}`}
        </CustomTabPanel>
      ))}
     </Box>
    </Box>
  )
}