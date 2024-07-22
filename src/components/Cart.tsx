import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { incrementQuantity, decrementQuantity, removeItemFromBasket } from '../store/basketSlice';
import RemoveItemConfirmation from './RemoveItemConfirmation';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.basket.items);
  const dispatch = useDispatch();
  const [itemToRemove, setItemToRemove] = useState<{ id: number; selectedOption?: string } | null>(null);

  const handleIncrement = (id: number, selectedOption?: string) => {
    dispatch(incrementQuantity({ id, selectedOption }));
  };

  const handleDecrement = (id: number, selectedOption?: string) => {
    const item = cartItems.find(item => item.id === id && item.selectedOption === selectedOption);
    if (item && item.quantity > 1) {
      dispatch(decrementQuantity({ id, selectedOption }));
    } else {
      setItemToRemove({ id, selectedOption });
    }
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      dispatch(removeItemFromBasket(itemToRemove));
      setItemToRemove(null);
    }
  };

  const handleCloseRemoveConfirmation = () => {
    setItemToRemove(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <Box sx={{ padding: '16px', borderRadius: '8px', background: '#F8F9FA' }}>
      <Typography variant="h6" sx={{ marginBottom: 2, color: '#4F372F' }}>
        Your Basket
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your basket is empty</Typography>
      ) : (
        cartItems.map((item: any) => (
          <Box key={`${item.id}-${item.selectedOption}`} sx={{ marginBottom: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {item.name}
            </Typography>
            {item.selectedOption && (
              <Typography variant="body2" sx={{ color: 'gray' }}>
                {item.selectedOption} meats
              </Typography>
            )}
            <Typography variant="body2">R${item.totalPrice.toFixed(2)}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => handleDecrement(item.id, item.selectedOption)} sx={{ backgroundColor: '#4F372F', color: 'white', '&:hover': { backgroundColor: '#3e2d24' } }}>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
                <IconButton onClick={() => handleIncrement(item.id, item.selectedOption)} sx={{ backgroundColor: '#4F372F', color: 'white', '&:hover': { backgroundColor: '#3e2d24' } }}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))
      )}
      {cartItems.length > 0 && (
        <>
          <Box sx={{ borderTop: '1px solid #ddd', paddingTop: 2 }}>
            <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span>R${subtotal.toFixed(2)}</span>
            </Typography>
          </Box>
          <Box sx={{ borderTop: '1px solid #ddd', paddingTop: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total:</span>
              <span>R${subtotal.toFixed(2)}</span>
            </Typography>
          </Box>
        </>
      )}
      <RemoveItemConfirmation
        open={itemToRemove !== null}
        onClose={handleCloseRemoveConfirmation}
        onConfirm={handleConfirmRemove}
      />
    </Box>
  );
};

export default Cart;
