import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, Box, useTheme } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; 

const LessonSavedPopup = ({ open, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate(); 

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <FontAwesomeIcon icon={faCheck} style={{ color: 'white', fontSize: '20px' }} />
          </Box>
          <DialogContentText
            sx={{ color: theme.palette.primary.main, textAlign: 'center', fontWeight: 'bold', marginBottom: '10px' }}
          >
            SUCCESS
          </DialogContentText>

          <DialogContentText sx={{ color: 'black', textAlign: 'center', marginTop: '18px' }}>
            New Section Added Successfully.
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            px: 4,
            '&:hover': { backgroundColor: theme.palette.primary.dark },
          }}
          onClick={() => {
            onClose(); 
            navigate('/lesson/view-lesson'); 
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LessonSavedPopup;
