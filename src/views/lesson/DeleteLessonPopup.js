import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const DisableUserPopup = ({ open, onClose, lessonId }) => {
  const navigate = useNavigate();

  const handleDeleteLesson = () => {
    // Make a DELETE request to delete the lesson
    fetch(`http://172.190.66.169:8003/api/delete-lesson/${lessonId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          navigate('/lesson/view-lesson');// Redirect to the lesson page
        }
      })
      .catch((error) => {
        console.error('Error deleting lesson:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Delete Lesson</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ marginBottom: '10px' }}>
          Are you sure you want to delete Lesson - Days of the Week?
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
            By deleting this lesson, the user would not be able to access it
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', marginLeft: '16px', marginRight: '16px' }}>
        <Button variant="contained" size="small" onClick={onClose} color="primary" sx={{ color: 'white' }}>
          No, Cancel
        </Button>
        <Button variant="contained" size="small" onClick={handleDeleteLesson} color="error">
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisableUserPopup;
