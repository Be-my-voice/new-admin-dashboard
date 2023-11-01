import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const DeleteQuestionPopup = ({ open, onClose, questionId }) => {
  
  const handleDeleteQuestion = () => {
    fetch(`http://172.190.66.169:8003/api/question/delete-question/${questionId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error deleting question:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Delete Question</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: '10px' }}>
          Are you sure you want to delete this question?
        </DialogContentText>
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
            By deleting this question, it will be permanently removed.
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', marginLeft: '16px', marginRight: '16px' }}>
        <Button variant="contained" size="small" onClick={onClose} color="primary" sx={{ color: 'white' }}>
          No, Cancel
        </Button>
        <Button variant="contained" size="small" onClick={handleDeleteQuestion} color="error">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteQuestionPopup;
