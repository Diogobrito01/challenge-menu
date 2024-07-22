import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuItemComponent from './MenuItem';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  images: { image: string }[];
}

interface MenuSectionProps {
  sections: {
    id: number;
    name: string;
    items: MenuItem[];
  }[];
  primaryColour: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ sections, primaryColour }) => {
  const [expandedSections, setExpandedSections] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const initialExpandedSections: { [key: number]: boolean } = {};
    sections.forEach(section => {
      initialExpandedSections[section.id] = true;
    });
    setExpandedSections(initialExpandedSections);
  }, [sections]);

  const handleExpandClick = (id: number) => {
    setExpandedSections((prevExpandedSections) => ({
      ...prevExpandedSections,
      [id]: !prevExpandedSections[id],
    }));
  };

  return (
    <Card>
      <CardContent>
        {sections.map((section) => (
          <Box key={section.id} mb={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h4" style={{ color: primaryColour }}>
                {section.name}
              </Typography>
              <IconButton onClick={() => handleExpandClick(section.id)}>
                {expandedSections[section.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={expandedSections[section.id]} timeout="auto" unmountOnExit>
              <Box mt={2}>
                {section.items.map((item) => (
                  <MenuItemComponent
                    key={item.id}
                    item={item}
                    primaryColour={primaryColour}
                    isBurger={section.name.toLowerCase() === 'burgers'}
                  />
                ))}
              </Box>
            </Collapse>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default MenuSection;
