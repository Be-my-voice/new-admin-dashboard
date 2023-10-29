import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Button, Divider } from '@mui/material';
import defaultVideo from '../../assets/videos/lesson/preview.mp4';
import AddSectionPopup from './AddSectionPopup';
import DeleteLessonPopup from './DeleteLessonPopup';
import EditLessonTitlePopup from './EditLessonTitlePopup';
import DeleteSectionPopup from './DeleteSectionPopup';

const ViewIndividualLesson = () => {
  // const { lessonId } = useParams();

  // state variables for pop-up
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteSectionPopup, setShowDeleteSectionPopup] = useState(false);
  const [showAddSectionPopup, setShowAddSectionPopup] = useState(false);

  // Function to handle the delete button click
  const handleDeleteButtonClick = () => {
    setShowDeletePopup(true);
  };

  // Function to handle the edit button click
  const handleEditButtonClick = () => {
    setShowEditPopup(true);
  };

  // Function to handle the delete section button click
  const handleDeleteSectionButtonClick = () => {
    setShowDeleteSectionPopup(true);
  };

  // Function to handle the add section button click
  const handleAddSectionButtonClick = () => {
    setShowAddSectionPopup(true);
  };

  // Function to close pop-ups
  const handleClosePopup = () => {
    setShowDeletePopup(false);
    setShowEditPopup(false);
    setShowDeleteSectionPopup(false);
    setShowAddSectionPopup(false);
  };

  const lesson ={
    title : "Days of the Week",
  };

  return (
    <MainCard sx={{ padding: { xs: '0', md: '0 20px'}}}>
      {/* title and buttons */}
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h3" sx={{ marginBottom: { xs: '0.5rem', md: 0 } }}>
          Lesson: {lesson.title}
        </Typography>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="secondary" sx={{ color: 'white' }} onClick={handleAddSectionButtonClick}>
            Add New Section
          </Button>
          <Button variant="contained" color="primary" sx={{paddingLeft: '35px', paddingRight: '35px', color: 'white', }} onClick={handleEditButtonClick}>
            Edit Title
          </Button>
          <Button variant="contained" color="error" sx={{ color: 'white', backgroundColor: '#f44336', }} onClick={handleDeleteButtonClick}>
            Delete Lesson
          </Button>
        </div>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* section cards */}
      <Grid container spacing={3}>
        {[...Array(5)].map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ boxShadow: 5, borderRadius: '8px' }}>
              <CardMedia component="video" controls muted height="160" > <source src={defaultVideo} type="video/mp4" /> Your browser does not support the video tag.</CardMedia>
                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    Section {String(index + 1).padStart(2, '0')}
                  </Typography>
                  <Typography variant="body2" align="center" color="textSecondary">
                    Monday
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                    <Button variant="outlined" color="primary" sx={{ width: '100px',  border: '1px solid' }} onClick={handleAddSectionButtonClick}>Edit</Button>
                    <Button variant="outlined" color="error" sx={{ width: '100px',  border: '1px solid' }} onClick={handleDeleteSectionButtonClick}>Delete</Button>
                  </div>

                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* Add new section button */}
      <Grid container justifyContent="center" mt={3}>
        <Button variant="contained" color="secondary" sx={{color:'white' , width: '100%', '&:hover': { backgroundColor: 'white', border:'2px solid',borderColor: 'secondary.main', color:'secondary.main' } }} 
        onClick={handleAddSectionButtonClick}>
          Add New Section
        </Button>
      </Grid>

      {/* handling pop up for deleting lesson*/}
      <DeleteLessonPopup open={showDeletePopup} onClose={handleClosePopup} />
      
      {/* handling pop up for editing lesson title */}
      <EditLessonTitlePopup open={showEditPopup} onClose={handleClosePopup} />

      {/* handling pop up for deleting section */}
      <DeleteSectionPopup open={showDeleteSectionPopup} onClose={handleClosePopup} />

      {/* handling pop up for editing section */}
      <AddSectionPopup open={showAddSectionPopup} onClose={handleClosePopup} /> 

    </MainCard>
  );
};

export default ViewIndividualLesson;
