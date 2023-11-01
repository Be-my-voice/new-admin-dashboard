import React, { useState, useEffect } from 'react';
import { Card, Box, Grid, Toolbar, Typography, Divider, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AddQuizPopup from './AddQuizPopup'; 
import { Link } from 'react-router-dom';
import withAuth from '../withAuth';

const UtilitiesShadow = () => {
  const [isAddQuizDialogOpen, setAddQuizDialogOpen] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  const handleAddQuiz = (newQuizTitle) => {
    console.log('Adding new quiz with title:', newQuizTitle);
    setAddQuizDialogOpen(false);
  };

  const handleToggleQuiz = (quiz) => {
    if (quiz.enabled) {
      disableQuiz(quiz.id);
    } else {
      enableQuiz(quiz.id);
    }
  };

  const enableQuiz = (quizId) => {
    fetch(`http://172.190.66.169:8003/api/quiz/enable-quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Quiz enabled:', data);
        fetchQuizzes();
      })
      .catch((error) => {
        console.error('Error enabling quiz:', error);
      });
  };

  const disableQuiz = (quizId) => {
    fetch(`http://172.190.66.169:8003/api/quiz/disable-quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Quiz disabled:', data);
        fetchQuizzes();
      })
      .catch((error) => {
        console.error('Error disabling quiz:', error);
      });
  };

  const fetchQuizzes = () => {
    fetch('http://172.190.66.169:8003/api/quiz/get-all-quizes', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Quiz data from API:', data);
        if (Array.isArray(data)) {
          setQuizzes(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching quiz data:', error);
      });
  };

  // const fetchQuestionCount = (quizId) => {
  //   return fetch(`http://172.190.66.169:8003/api/quiz/get-question-count/${quizId}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((count) => {
  //       setcountQuestion(count); 
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching question count:', error);
  //     });
  // };

  useEffect(() => {
    fetchQuizzes();
  }, []);
  

  return (
    <MainCard>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Quizzes</Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2, px: 4 }}
          onClick={() => setAddQuizDialogOpen(true)}
        >
          Add New Quiz
        </Button>
      </Toolbar>
      <Divider />
      <Grid container spacing={gridSpacing} mt={2}>
        {quizzes.map((quiz) => (
          <Grid key={quiz.id} item xs={12} sm={6} md={4} lg={3}>
            <ShadowBox quiz={quiz} handleToggleQuiz={handleToggleQuiz} />
          </Grid>
        ))}
      </Grid>
      <AddQuizPopup
        open={isAddQuizDialogOpen}
        onClose={() => setAddQuizDialogOpen(false)}
        onAddQuiz={handleAddQuiz}
      />
    </MainCard>
  );
};

const ShadowBox = ({ quiz, handleToggleQuiz }) => {

  return (
    <Card sx={{ mb: 3, boxShadow: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4.5,
          bgcolor: 'primary.light',
          color: 'text.primary',
          borderRadius: '10px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Typography variant="h4" component="div" mt={2}>
          {quiz.quizName}
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={1}>
          Questions: 0
        </Typography>
        <Link to={`/quiz/${quiz.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" style={{background:'white', color:'#22bb33', border: '2px solid #5cb85c'}} size="small" sx={{ mt: 1, px: 4 }}>
            View Quiz
          </Button>
        </Link>
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 2,
            px: 3,
            backgroundColor: quiz.enabled ? 'red' : 'green',
            '&:hover': {
              backgroundColor: quiz.enabled ? 'darkred' : 'darkgreen', 
            },
          }}
          onClick={() => handleToggleQuiz(quiz)}
          style={{ color: 'white' }}
        >
          {quiz.enabled ? 'Disable Quiz' : 'Enable Quiz'}
        </Button>
      </Box>
    </Card>
  );
};

export default withAuth(UtilitiesShadow);
