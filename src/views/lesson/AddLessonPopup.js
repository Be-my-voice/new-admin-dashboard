import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';


const AddLessonPopup = ({ open, onClose, onAddLesson }) => {
  const [lessonTitle, setLessonTitle] = useState('');

  const handleAddLesson = () => {
    fetch('http://172.190.66.169:8003/api/create-lesson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: lessonTitle,
        enabled: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New Lesson created:', data);
        onAddLesson(data.title); 
        onClose();
      })
      .catch((error) => {
        console.error('Error creating lesson:', error);
      });
  };
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>
        Add New Lesson
      </DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <form>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Enter a title for the new lesson:
          </Typography>
          <TextField
            label="Lesson Title"
            variant="outlined"
            fullWidth
            value={lessonTitle}
            sx={{ mt: 1 }}
            onChange={(e) => setLessonTitle(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop:'20px' }}>
            <Button variant="contained" color="error" onClick={onClose} sx={{ px: 4 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ paddingRight: '20px', paddingLeft: '20px', color: 'white' }}
              onClick={handleAddLesson}
            >
              Add Lesson
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLessonPopup;
