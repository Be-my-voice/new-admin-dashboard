import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid, Typography, Divider, TextField } from '@mui/material';
import AddQuestionPopup from './AddQuestionPopup';
// import IncompleteQuiz from './IncompleteQuizPopup';
import SavedQuizPopup from './QuizSavePopup';

const AddLesson = () => {
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
  const [showSaveQuizPopup, setShowSaveQuizPopup] = useState(false);
  // const [showIncompleteQuizPopup, setShowIncompleteQuizPopup] = useState(false);

  // Function to handle the add question button click
  const handleAddQuestionButtonClick = () => {
    setShowAddQuestionPopup(true);
  };

  // Function to handle the save quiz button click
  const handleSaveQuizButtonClick = () => {
    setShowSaveQuizPopup(true);
  };

  //handles add question in incomplete quiz pop up
  // const handleAddQuestionConfirmed = () => {
  //   setShowIncompleteQuizPopup(false);
  //   setShowAddQuestionPopup(true);
  // };

  // Function to handle the incomplete quiz button click
  // const handleIncompleteQuizButtonClick = () => {
  //   setShowIncompleteQuizPopup(true);
  // };

  // Function to close pop-ups
  const handleClosePopup = () => {
    setShowAddQuestionPopup(false);
    setShowSaveQuizPopup(false);
    // setShowIncompleteQuizPopup(false);
  };

  return (
    <MainCard>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Add New Quiz</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: '8px 25px', color: 'white', backgroundColor: '#147B72', '&:hover': { backgroundColor: '#117163' } }}
          // onClick={handleIncompleteQuizButtonClick}
          onClick={handleSaveQuizButtonClick}
          >
          Save Quiz
        </Button>
      </Grid>
      <Divider sx={{ marginTop: '15px' }} />

      <form>
        {/* Lesson Title Form */}
        {/* <Typography variant="h5" sx={{ fontWeight: 600, marginTop:'20px' }}>Lesson Title</Typography> */}
        <TextField
          label="Enter Quiz title"
          variant="outlined"
          fullWidth
          margin="normal"
          id="lessonTitle"
          sx={{ marginBottom: '20px' }}
        />
        {/* Add new section button */}
        <Grid container justifyContent="center">
          <Button
            variant="contained"
            color="secondary"
            sx={{
              color: 'white',
              width: '100%',
              '&:hover': {
                backgroundColor: 'white',
                border: '2px solid',
                borderColor: 'secondary.main',
                color: 'secondary.main'
              }
            }}
            onClick={handleAddQuestionButtonClick}
          >
            Add New Question
          </Button>
        </Grid>
      </form>

      {/* handling pop up for editing section */}
      <AddQuestionPopup open={showAddQuestionPopup} onClose={handleClosePopup} /> 

      {/* handling pop up for saving lesson */}
      <SavedQuizPopup open={showSaveQuizPopup} onClose={handleClosePopup} /> 

      {/* handling pop up for incomplete lesson */}
      {/* <IncompleteQuiz open={showIncompleteQuizPopup} onClose={handleClosePopup} onAddSection={handleAddQuestionConfirmed} />  */}

    </MainCard>
  );
};

export default AddLesson;
