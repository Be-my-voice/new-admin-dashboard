import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, Box, styled } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    maxWidth: '400px',
    borderRadius: '8px',
  },
});

const StyledDialogActions = styled(DialogActions)({
  justifyContent: 'center',
  marginBottom: '15px',
});

const ErrorPopup = ({ open, onClose, message }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: 'red',
              borderRadius: '50%',
              width: '55px',
              height: '55px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <FontAwesomeIcon icon={faExclamationCircle} style={{ color: 'white', fontSize: '45px' }} />
          </Box>
          <DialogContentText sx={{ color: 'red', textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
            ERROR
          </DialogContentText>

          <DialogContentText sx={{ color: 'black', textAlign: 'center', marginTop: '18px' }}>
            {message}
          </DialogContentText>
        </Box>
      </DialogContent>
      <StyledDialogActions>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: 'red',
            color: 'white',
            px: 4,
            '&:hover': { backgroundColor: 'darkred' },
          }}
          onClick={onClose}
        >
          OK
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default ErrorPopup;
