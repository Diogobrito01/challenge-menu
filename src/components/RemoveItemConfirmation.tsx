import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface RemoveItemConfirmationProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveItemConfirmation: React.FC<RemoveItemConfirmationProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove Item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove this item from your basket?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveItemConfirmation;
