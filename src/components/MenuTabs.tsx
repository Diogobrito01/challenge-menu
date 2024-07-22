import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface MenuTabsProps {
  selectedTab: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const MenuTabs: React.FC<MenuTabsProps> = ({ selectedTab, onChange }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
      <Tabs value={selectedTab} onChange={onChange} centered>
        <Tab label="Burgers" />
        <Tab label="Drinks" />
        <Tab label="Desserts" />
      </Tabs>
    </Box>
  );
};

export default MenuTabs;
