import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography } from '@mui/material';

const EditLessonTitlePopup = ({ open, onClose, existingTitle, lessonId }) => {
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    setNewTitle(existingTitle);
  }, [existingTitle]);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleSave = () => {
    const data = {
      title: newTitle
    };

    fetch(`http://172.190.66.169:8003/api/update-lesson-title/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          onClose();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error updating lesson title:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Edit Lesson Title</DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <form>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Enter a new title for the lesson:
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              id="lessonTitle"
              InputProps={{ style: { border: '1px solid #147B72', outline: 'none', boxShadow: 'none' } }}
              value={newTitle}
              onChange={handleTitleChange}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="contained" color="error" onClick={onClose}>
              Discard Changes
            </Button>
            <Button variant="contained" color="primary" sx={{ paddingRight: '20px', paddingLeft: '20px', color: "white" }} onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLessonTitlePopup;
