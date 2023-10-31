import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Modal, Box, TextField } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import withAuth from '../withAuth';

const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePassword = () => {
    // You can implement the logic to change the password here
    console.log(`Changing password...`);
    closeModal();
  };

  return (
    <>
      <MainCard border={false} sx={{ height: 220 }}>
        <Card>
          <CardContent>
            <Typography variant="h2" component="div" sx={{ color: '#147B72' }}>
              Secure your account by updating the password
            </Typography>
            <Button
              variant="contained"
              color="success"
              onClick={openModal}
              sx={{ marginTop: 2, backgroundColor: '#fff', borderColor: '#147B72',
              '&:hover': {
                color: '#fff',
                backgroundColor: '#147B72', // Background color on hover
            },
            }}
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </MainCard>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="change-password-modal"
        aria-describedby="modal-to-change-password"
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
          <Typography variant="h6" component="div" sx={{ color: '#147B72' }}>
            Change Password
          </Typography>
          <TextField
            type="password"
            label="Current Password"
            variant="outlined"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            type="password"
            label="New Password"
            variant="outlined"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <TextField
            type="password"
            label="Confirm New Password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
            <Box sx={{ marginRight: 2 }}>
              <Button
                onClick={closeModal}
                sx={{
                  color: '#898A8D', // Text color
                  borderColor: '#898A8D', // Border color
                  backgroundColor: '#fff', // Background color
                  '&:hover': {
                    color: '#fff',
                    backgroundColor: '#898A8D', // Background color on hover
                }, 
                }}
              >
                Cancel
              </Button>
            </Box>
            <Button
              onClick={handleChangePassword}
              variant="contained"
              color="success"
              sx={{
                color: '#147B72',
                borderColor: '#147B72',
                backgroundColor: '#fff',
                borderWidth: 2,
              }}
            >
              Change Password
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default withAuth(ChangePassword);
