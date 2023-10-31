import React, { useState }  from 'react';
import MainCard from 'ui-component/cards/MainCard';
// import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Button, Divider } from '@mui/material';
import defaultVideo from '../../assets/videos/lesson/preview.mp4';
import AddQuestionPopup from './AddQuestionPopup';
import DeleteQuizPopup from './DeleteQuizPopup';
import EditQuizTitlePopup from './EditQuizTitlePopup';
import DeleteQuestionPopup from './DeleteQuestionPopup';
import withAuth from '../withAuth'; 

const ViewIndividualQuiz = () => {
  // const { quizId } = useParams();

  // state variables for pop-up
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteQuestionPopup, setShowDeleteQuestionPopup] = useState(false);
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);

  // Function to handle the delete button click
  const handleDeleteButtonClick = () => {
    setShowDeletePopup(true);
  };

  // Function to handle the edit button click
  const handleEditButtonClick = () => {
    setShowEditPopup(true);
  };

  // Function to handle the delete Question button click
  const handleDeleteQuestionButtonClick = () => {
    setShowDeleteQuestionPopup(true);
  };

  // Function to handle the add question button click
  const handleAddQuestionButtonClick = () => {
    setShowAddQuestionPopup(true);
  };

  // Function to close pop-ups
  const handleClosePopup = () => {
    setShowDeletePopup(false);
    setShowEditPopup(false);
    setShowDeleteQuestionPopup(false);
    setShowAddQuestionPopup(false);
  };

  const quiz ={
    title : "Days of the Week",
  };

  return (
    <MainCard sx={{ padding: { xs: '0', md: '0 20px'}}}>
      {/* title and buttons */}
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h3" sx={{ marginBottom: { xs: '0.5rem', md: 0 } }}>
          quiz: {quiz.title}
        </Typography>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="primary" sx={{paddingLeft: '35px', paddingRight: '35px', color: 'white', }} 
          onClick={handleEditButtonClick}
          >
            Edit Title
          </Button>
          <Button variant="contained" color="error" sx={{ color: 'white', backgroundColor: '#f44336',paddingLeft: '20px', paddingRight: '20px', }} 
          onClick={handleDeleteButtonClick}
        >
            Delete Quiz
          </Button>
        </div>
      </Grid>

      <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
            {[...Array(5)].map((_, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ boxShadow: 5, borderRadius: '8px' }}>
                    {/* Video */}
                    <CardMedia component="video" controls muted height="160">
                    <source src={defaultVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                    </CardMedia>

                    {/* Content */}
                    <CardContent>
                    <Typography variant="h6" component="div" align="center">
                        Question {String(index + 1).padStart(2, '0')}
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary">
                        Monday
                    </Typography>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        {/* First Choice */}
                        <Button variant="contained" color="success" sx={{ width: '45%', margin: '0 5px', color: 'white' }}>
                            Choice 1
                        </Button>
                        
                        {/* Second Choice */}
                        <Button variant="contained" color="error" sx={{ width: '45%', margin: '0 5px', }}>
                            Choice 2
                        </Button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                        {/* Third Choice */}
                        <Button variant="contained" color="error" sx={{ width: '45%', margin: '0 5px',  }}>
                            Choice 3
                        </Button>
                        
                        {/* Fourth Choice */}
                        <Button variant="contained" color="error" sx={{ width: '45%', margin: '0 5px', }}>
                            Choice 4
                        </Button>
                    </div>


                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                        <Button variant="outlined" color="primary" sx={{ width: '100px', border: '1px solid' }} 
                        onClick={handleAddQuestionButtonClick}
                        >
                        Edit
                        </Button>
                        <Button variant="outlined" color="error" sx={{ width: '100px', border: '1px solid' }} 
                        onClick={handleDeleteQuestionButtonClick}
                        >
                        Delete
                        </Button>
                    </div>
                    </CardContent>
                </Card>
                </Grid>
            ))}
        </Grid>


      {/* Add new question button */}
      <Grid container justifyContent="center" mt={3}>
        <Button variant="contained" color="secondary" sx={{color:'white' , width: '100%', '&:hover': { backgroundColor: 'white', border:'2px solid',borderColor: 'secondary.main', color:'secondary.main' } }} 
        onClick={handleAddQuestionButtonClick}
        >
          Add New Question
        </Button>
      </Grid>

      {/* handling pop up for deleting quiz */}
      <DeleteQuizPopup open={showDeletePopup} onClose={handleClosePopup} />
      
      {/* handling pop up for editing quiz title */}
      <EditQuizTitlePopup open={showEditPopup} onClose={handleClosePopup} />

      {/* handling pop up for deleting Question */}
      <DeleteQuestionPopup open={showDeleteQuestionPopup} onClose={handleClosePopup} />

      {/* handling pop up for editing Question */}
      <AddQuestionPopup open={showAddQuestionPopup} onClose={handleClosePopup} /> 

    </MainCard>
  );
};

// export default ViewIndividualQuiz;
export default withAuth(ViewIndividualQuiz);