import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Button, Divider } from '@mui/material';
import defaultVideo from '../../assets/videos/lesson/preview.mp4';
import AddQuestionPopup from './AddQuestionPopup';
import DeleteQuizPopup from './DeleteQuizPopup';
import EditQuizTitlePopup from './EditQuizTitlePopup';
import DeleteQuestionPopup from './DeleteQuestionPopup';
import EditQuestionPopup from './EditQuestionPopup';
import withAuth from '../withAuth';
import { Backdrop, CircularProgress } from '@mui/material';

const ViewIndividualQuiz = () => {
  const { quizId } = useParams();

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteQuestionPopup, setShowDeleteQuestionPopup] = useState(false);
  const [showAddQuestionPopup, setShowAddQuestionPopup] = useState(false);
  const [quiz, setQuiz] = useState({ quizName: '' });
  const [questions, setQuestions] = useState([]);
  const [questionIdToDelete, setQuestionIdToDelete] = useState(null);
  const [showEditQuestionPopup, setShowEditQuestionPopup] = useState(false);
  const [questionDataToEdit, setQuestionDataToEdit] = useState(null);

  const handleEditQuestionButtonClick = (questionId, question, answer1, answer2, answer3, answer4, correctAnswer) => {
    const questionData = {
      id: questionId,
      question: question,
      answer1: answer1,
      answer2: answer2,
      answer3: answer3,
      answer4: answer4,
      correctAnswer: correctAnswer,
    };
  
    setQuestionDataToEdit(questionData);
    //console.log(questionData);
    setShowEditQuestionPopup(true);
  };
  
  const [loading, setLoading] = useState(false);

  const fetchQuizTitle = async () => {
    
    try {
      const response = await fetch(`http://172.190.66.169:8003/api/quiz/get-quiz-by-id/${quizId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setQuiz({ quizName: data.quizName });
    } catch (error) {
      console.error('Error fetching quiz title:', error);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://172.190.66.169:8003/api/question/get-questions-by-quiz-id/${quizId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizTitle();
    fetchQuestions();
  }, [quizId]);

  const handleDeleteButtonClick = () => {
    setShowDeletePopup(true);
  };

  const handleEditButtonClick = () => {
    setShowEditPopup(true);
  };

  const handleDeleteQuestionButtonClick = (questionId) => {
    setQuestionIdToDelete(questionId);
    setShowDeleteQuestionPopup(true);
  };

  const handleAddQuestionButtonClick = () => {
    setShowAddQuestionPopup(true);
  };

  const handleClosePopup = () => {
    setShowDeletePopup(false);
    setShowEditPopup(false);
    setShowDeleteQuestionPopup(false);
    setShowAddQuestionPopup(false);
    setShowEditQuestionPopup(false);
  };

  return (
    <MainCard sx={{ padding: { xs: '0', md: '0 20px' }}}>
      <><Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h3" sx={{ marginBottom: { xs: '0.5rem', md: 0 } }}>
          Quiz: {quiz.quizName}
        </Typography>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ paddingLeft: '35px', paddingRight: '35px', color: 'white' }}
            onClick={handleEditButtonClick}
          >
            Edit Title
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ color: 'white', backgroundColor: '#f44336', paddingLeft: '20px', paddingRight: '20px' }}
            onClick={handleDeleteButtonClick}
          >
            Delete Quiz
          </Button>
        </div>
      </Grid><Divider sx={{ my: 2 }} /><Grid container spacing={3}>
          {questions.map((question, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ boxShadow: 5, borderRadius: '8px' }}>
                <CardMedia component="video" controls muted height="160">
                  <source src={defaultVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </CardMedia>

                <CardContent>
                  <Typography variant="h6" component="div" align="center">
                    Question {String(index + 1).padStart(2, '0')}
                  </Typography>

                  <Typography variant="body2" align="center" color="textSecondary">
                    {question.question}
                  </Typography>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Button
                      variant="contained"
                      sx={{
                        width: '45%',
                        margin: '0 5px',
                        color: question.correctAnswer === question.answer1 ? 'white' : 'error',
                        backgroundColor: question.correctAnswer === question.answer1 ? 'success' : '#f44336',

                      }}
                    >
                      {question.answer1}
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: '45%',
                        margin: '0 5px',
                        color: question.correctAnswer === question.answer2 ? 'white' : 'error',
                        backgroundColor: question.correctAnswer === question.answer2 ? 'success' : '#f44336',
                      }}
                    >
                      {question.answer2}
                    </Button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                    <Button
                      variant="contained"
                      sx={{
                        width: '45%',
                        margin: '0 5px',
                        color: question.correctAnswer === question.answer3 ? 'white' : 'error',
                        backgroundColor: question.correctAnswer === question.answer3 ? 'success' : '#f44336',
                      }}
                    >
                      {question.answer3}
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        width: '45%',
                        margin: '0 5px',
                         color: question.correctAnswer === question.answer4 ? 'white' : 'error',
                         backgroundColor: question.correctAnswer === question.answer4 ? 'success' : '#f44336',
                      }}
                    >
                      {question.answer4}
                    </Button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ width: '100px', border: '1px solid' }}
                      onClick={() => handleEditQuestionButtonClick(question.id, question.question, question.answer1, question.answer2, question.answer3, question.answer4, question.correctAnswer)}>
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ width: '100px', border: '1px solid' }}
                      onClick={() => handleDeleteQuestionButtonClick(question.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid><Grid container justifyContent="center" mt={3}>
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
                color: 'secondary.main',
              },
            }}
            onClick={handleAddQuestionButtonClick}
          >
            Add New Question
          </Button>
        </Grid>
        
        <DeleteQuizPopup open={showDeletePopup} onClose={handleClosePopup} quizId={quizId}  />
        <EditQuizTitlePopup open={showEditPopup} onClose={handleClosePopup}  quizId={quizId} existingTitle={quiz.quizName}/>
        <DeleteQuestionPopup open={showDeleteQuestionPopup} onClose={handleClosePopup} questionId={questionIdToDelete}/>
        <AddQuestionPopup open={showAddQuestionPopup} onClose={handleClosePopup} quizId={quizId}  />
        <EditQuestionPopup open={showEditQuestionPopup} onClose={handleClosePopup} questionData={questionDataToEdit}/>
        </>
        <Backdrop open={loading} style={{ zIndex: 9999, color: '#fff' }}>
          <CircularProgress color="inherit" />
          Loading
        </Backdrop>
    </MainCard>
  );
};

export default withAuth(ViewIndividualQuiz);
