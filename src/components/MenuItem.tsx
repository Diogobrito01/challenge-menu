import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ItemModal from './ItemModal';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: { image: string }[];
  };
  primaryColour: string;
  isBurger: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, primaryColour, isBurger }) => {
  const [open, setOpen] = useState(false);
  const itemQuantities = useSelector((state: RootState) => state.basket.itemQuantities);

  const key = `${item.id}-${isBurger ? 'burger' : 'other'}`;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const itemImage = item.images && item.images.length > 0 ? item.images[0].image : '';
  const quantity = itemQuantities[key] || 0;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: 2,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'lightblue',
          },
        }}
        onClick={handleOpen}
      >
        {quantity > 0 && (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              backgroundColor: '#4F372F',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 1,
            }}
          >
            {quantity}
          </Box>
        )}
        <Box sx={{ flexGrow: 1, marginRight: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', wordWrap: 'break-word' }}>
            {item.description}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'left' }}>
            R${item.price.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ width: 128, height: 85 }}>
          <img
            src={itemImage}
            alt={item.name}
            style={{
              width: '128px',
              height: '85px',
              objectFit: 'cover',
              borderRadius: '8px 8px 8px 8px',
            }}
          />
        </Box>
      </Box>
      <ItemModal open={open} onClose={handleClose} item={item} isBurger={isBurger} />
    </>
  );
};

export default MenuItem;
