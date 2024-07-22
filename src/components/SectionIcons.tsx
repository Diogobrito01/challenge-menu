import React from 'react';
import { Box, Typography } from '@mui/material';

interface SectionIconsProps {
  sections: {
    id: number;
    name: string;
    images: { image: string }[];
  }[];
  selectedSectionId: number;
  onSelect: (id: number) => void;
}

const SectionIcons: React.FC<SectionIconsProps> = ({ sections, selectedSectionId, onSelect }) => {
  return (
    <Box display="flex" justifyContent="flex-start" alignItems="center" mb={4}>
      {sections.map((section) => (
        <Box
          key={section.id}
          onClick={() => onSelect(section.id)}
          sx={{
            textAlign: 'center',
            cursor: 'pointer',
            marginRight: 3,
            marginLeft: 3,
            justifyContent: 'space-around',
            borderBottom: section.id === selectedSectionId ? '2px solid #000' : 'none',
          }}
        >
          <img
            src={section.images[0].image}
            alt={section.name}
            style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: section.id === selectedSectionId ? '2px solid #000' : '2px solid transparent',
              boxSizing: 'border-box',
            }}
          />
          <Typography variant="subtitle1">{section.name}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SectionIcons;
