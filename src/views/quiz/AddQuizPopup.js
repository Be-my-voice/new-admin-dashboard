import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';

const AddQuizPopup = ({ open, onClose, onAddQuiz }) => {
  const [quizTitle, setQuizTitle] = useState('');

  const handleAddQuiz = () => {
    const apiUrl = 'http://172.190.66.169:8003/api/quiz/create-quiz';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizName: quizTitle,
        quizDescription: 'quiz',
        enabled: true,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New quiz created:', data);
        onAddQuiz(data.quizName);
        onClose();
      })
      .catch((error) => {
        console.error('Error creating quiz:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>
        Add New Quiz
      </DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <form>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Enter a title for the new quiz:
          </Typography>
          <TextField
            label="Quiz Title"
            variant="outlined"
            fullWidth
            value={quizTitle}
            sx={{ mt: 1 }}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" color="error" onClick={onClose} sx={{ px: 3 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ paddingRight: '20px', paddingLeft: '20px', color: 'white' }}
              onClick={handleAddQuiz}
            >
              Add Quiz
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuizPopup;
