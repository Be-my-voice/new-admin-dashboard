import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Box, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

const ChangePriceCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAmount] = useState(2000); // Example initial amount
  const [newAmount, setNewAmount] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // You can implement the logic to save the new amount here
    console.log(`Updating price to: ${newAmount}`);
    closeModal();
  };

  return (
    <>
      <MainCard border={false} sx={{ height: 220 }}>
        <Card>
          <CardContent>
            <Typography variant="h3" component="div" sx={{ color: '#147B72' }}>
              Change Price of Premium Package
            </Typography>
            <Button
              variant="contained"
            //   color="success"
              onClick={openModal}
              sx={{
                marginTop: 2,
                color: '#black', // Text color
                borderColor: '#147B72', // Border color
                backgroundColor: '#fff', // Background color
                borderWidth: 5, // Increase border thickness
                '&:hover': {
                    color: '#fff',
                    backgroundColor: '#147B72', // Background color on hover
                },
              }}
            >
              Update
            </Button>
          </CardContent>
        </Card>
      </MainCard>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="change-price-modal"
        aria-describedby="modal-to-change-price"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography variant="h4" component="div" sx={{ color: '#black' }}>
            Update Price of Premium Package
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#147B72', mt: 2 }}>
            Current Amount (Rs): {currentAmount}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#147B72', mt: 2 }}>
            New Amount (Rs):
          </Typography>
          <TextField
            type="number"
            variant="outlined"
            fullWidth
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            sx={{ mt: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={closeModal} sx={{ 
                mr:2,
                color: '#898A8D', // Text color
                borderColor: '#898A8D', // Border color
                backgroundColor: '#fff', // Background color
                '&:hover': {
                    color: '#fff',
                    backgroundColor: '#898A8D', // Background color on hover
                }, 
             }}>
              Cancel
            </Button>
            <Button 
            onClick={handleSave}
              variant="contained"
              color="success"
              sx={{
                color: '#147B72', // Text color
                borderColor: '#147B72', // Border color
                backgroundColor: '#fff', // Background color
                '&:hover': {
                    color: '#fff',
                    backgroundColor: '#147B72', // Background color on hover 
                },
              }}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ChangePriceCard;
