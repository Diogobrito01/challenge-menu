import React, { useState } from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, Box, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { addItemToBasket } from '../store/basketSlice';

interface ItemModalProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: number;
    name: string;
    description: string;
    price: number;
    images: { image: string }[];
  };
  isBurger: boolean;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(price).replace('R$', 'R$ ');
};

const ItemModal: React.FC<ItemModalProps> = ({ open, onClose, item, isBurger }) => {
  const [selectedOption, setSelectedOption] = useState('1');
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const itemImage = item.images && item.images.length > 0 ? item.images[0].image : '';

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleAddToOrder = () => {
    const priceMapping: Record<string, number> = {
      '1': 33,
      '2': 35,
      '3': 37,
    };

    const itemPrice = isBurger ? priceMapping[selectedOption] : item.price;
    const totalPrice = itemPrice * quantity;

    const basketItem = {
      ...item,
      selectedOption: isBurger ? selectedOption : undefined,
      quantity,
      totalPrice,
    };

    dispatch(addItemToBasket(basketItem));
    onClose();
  };

  const priceMapping: Record<string, number> = {
    '1': 33,
    '2': 35,
    '3': 37,
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };

  const totalPrice = isBurger ? priceMapping[selectedOption] * quantity : item.price * quantity;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '480px',
          background: '#F8F9FA',
          padding: '0',
          borderRadius: '8px',
        },
      }}
    >
      <DialogContent sx={{ padding: '0', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box>
          <img
            src={itemImage}
            alt={item.name}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px 8px 0 0',
            }}
          />
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ padding: '16px', flex: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {item.name}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {item.description}
          </Typography>
          {isBurger && (
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                Choose your size
              </Typography>
              <Typography variant="body2" sx={{ color: 'gray', marginBottom: 1 }}>
                Select 1 option
              </Typography>
              <Box sx={{ marginBottom: 1 }} />
              <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>1 meat</Typography>
                    <Typography variant="body1">R${priceMapping['1'].toFixed(2).replace('.', ',')}</Typography>
                  </Box>
                  <Radio value="1" />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>2 meats</Typography>
                    <Typography variant="body1">R${priceMapping['2'].toFixed(2).replace('.', ',')}</Typography>
                  </Box>
                  <Radio value="2" />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>3 meats</Typography>
                    <Typography variant="body1">R${priceMapping['3'].toFixed(2).replace('.', ',')}</Typography>
                  </Box>
                  <Radio value="3" />
                </Box>
              </RadioGroup>
            </Box>
          )}
          <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton onClick={handleIncrement} sx={{ backgroundColor: '#4F372F', color: 'white', '&:hover': { backgroundColor: '#3e2d24' } }}>
              <AddIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ padding: '16px' }}>
          <Button
            onClick={handleAddToOrder}
            variant="contained"
            sx={{
              width: '100%',
              height: '48px',
              borderRadius: '40px',
              padding: '4px 24px',
              backgroundColor: '#4F372F',
              color: 'white',
              gap: '8px',
              '&:hover': {
                backgroundColor: '#3e2d24',
              },
            }}
          >
            Add to Order • {formatPrice(totalPrice)}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ItemModal;
