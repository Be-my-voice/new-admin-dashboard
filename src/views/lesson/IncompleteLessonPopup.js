import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const IncompleteLesson = ({ open, onClose, onAddSection }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Incomplete Lesson</DialogTitle>
      <DialogContent>
        <div
          style={{
            fontWeight: 'bold',
            backgroundColor: '#FFE9D9',
            padding: '13px',
            color: '#771505',
          }}
        >
          <FontAwesomeIcon icon={faExclamationTriangle} style={{ height: '13px', marginRight: '5px' }} /> Warning
          <DialogContentText style={{ color: '#BC4C2E', marginTop: '5px' }}>
            At least one section is required before saving.
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions
        style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', marginLeft: '16px', marginRight: '16px' }}
      >
        <Button variant="contained" size="small" onClick={onClose} color="primary">
          No, Cancel
        </Button>
        <Button variant="contained" size="small" color="error" onClick={onAddSection}>
          Add Section
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncompleteLesson;
