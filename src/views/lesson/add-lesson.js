import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid, Typography, Divider, TextField } from '@mui/material';
import AddSectionPopup from './AddSectionPopup';
// import IncompleteLesson from './IncompleteLessonPopup';
import SavedLessonPopup from './LessonSavePopup';

const AddLesson = () => {
  const [showAddSectionPopup, setShowAddSectionPopup] = useState(false);
  const [showSaveLessonPopup, setShowSaveLessonPopup] = useState(false);
  // const [showIncompleteLessonPopup, setShowIncompleteLessonPopup] = useState(false);

  // Function to handle the add section button click
  const handleAddSectionButtonClick = () => {
    setShowAddSectionPopup(true);
  };

  // Function to handle the save lesson button click
  const handleSaveLessonButtonClick = () => {
    setShowSaveLessonPopup(true);
  };

  // //handles add section in incomplete lesson pop up
  // const handleAddSectionConfirmed = () => {
  //   setShowIncompleteLessonPopup(false);
  //   setShowAddSectionPopup(true);
  // };

  // // Function to handle the incomplete lesson button click
  // const handleIncompleteLessonButtonClick = () => {
  //   setShowIncompleteLessonPopup(true);
  // };

  // Function to close pop-ups
  const handleClosePopup = () => {
    setShowAddSectionPopup(false);
    setShowSaveLessonPopup(false);
    // setShowIncompleteLessonPopup(false);

  };

  return (
    <MainCard>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>Add New Lesson</Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: '8px 25px', color: 'white', backgroundColor: '#147B72', '&:hover': { backgroundColor: '#117163' } }}
          // onClick={handleIncompleteLessonButtonClick}
          onClick={handleSaveLessonButtonClick}
          >
          Save Lesson
        </Button>
      </Grid>
      <Divider sx={{ marginTop: '15px' }} />

      <form>
        {/* Lesson Title Form */}
        {/* <Typography variant="h5" sx={{ fontWeight: 600, marginTop:'20px' }}>Lesson Title</Typography> */}
        <TextField
          label="Enter lesson title"
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
            onClick={handleAddSectionButtonClick}
          >
            Add New Section
          </Button>
        </Grid>
      </form>

      {/* handling pop up for editing section */}
      <AddSectionPopup open={showAddSectionPopup} onClose={handleClosePopup} /> 

      {/* handling pop up for saving lesson */}
      <SavedLessonPopup open={showSaveLessonPopup} onClose={handleClosePopup} /> 

      {/* handling pop up for incomplete lesson */}
      {/* <IncompleteLesson open={showIncompleteLessonPopup} onClose={handleClosePopup} onAddSection={handleAddSectionConfirmed} />  */}

    </MainCard>
  );
};

export default AddLesson;