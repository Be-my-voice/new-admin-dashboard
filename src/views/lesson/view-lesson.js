import React, { useState, useEffect } from 'react';
import { Card, Box, Grid, Toolbar, Typography, Divider, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AddLessonPopup from './AddLessonPopup';
import { Link } from 'react-router-dom';
import withAuth from '../withAuth';

const UtilitiesShadow = () => {
  const [isAddLessonDialogOpen, setAddLessonDialogOpen] = useState(false);
  const [lessons, setLessons] = useState([]);

  const handleAddLesson = (newLessonTitle) => {
    console.log('Adding new lesson with title:', newLessonTitle);
    setAddLessonDialogOpen(false);
  };

  const handleToggleLesson = (lesson) => {
    if (lesson.enabled) {
      disableLesson(lesson.id);
    } else {
      enableLesson(lesson.id);
    }
  };

  const enableLesson = (lessonId) => {
    fetch(`http://172.190.66.169:8003/api/enable-lesson/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Lesson enabled:', data);
        fetchLessons();
      })
      .catch((error) => {
        console.error('Error enabling lesson:', error);
      });
  };

  const disableLesson = (lessonId) => {
    fetch(`http://172.190.66.169:8003/api/disable-lesson/${lessonId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Lesson disabled:', data);
        fetchLessons();
      })
      .catch((error) => {
        console.error('Error disabling lesson:', error);
      });
  };

  const fetchLessons = () => {
    fetch('http://172.190.66.169:8003/api/get-all-lessons', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Lesson data from API:', data);
        if (Array.isArray(data)) {
          setLessons(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching lesson data:', error);
      });
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <MainCard>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4">Lessons</Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{ mt: 2, px: 4 }}
          onClick={() => setAddLessonDialogOpen(true)}
        >
          Add New Lesson
        </Button>
      </Toolbar>
      <Divider />
      <Grid container spacing={gridSpacing} mt={2}>
        {lessons.map((lesson, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <ShadowBox lesson={lesson} handleToggleLesson={handleToggleLesson} />
          </Grid>
        ))}
      </Grid>
      <AddLessonPopup
        open={isAddLessonDialogOpen}
        onClose={() => setAddLessonDialogOpen(false)}
        onAddLesson={handleAddLesson}
      />
    </MainCard>
  );
};

const ShadowBox = ({ lesson, handleToggleLesson }) => (
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
        {lesson.title}
      </Typography>
      <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" style={{background:'white', color:'#22bb33', border: '2px solid #5cb85c'}} size="small" sx={{ mt: 1, px: 4 }}>
          View Lesson
        </Button>
      </Link>
      <Button
          variant="contained"
          size="small"
          sx={{mt: 2, px: 3,
            backgroundColor: lesson.enabled ? 'red' : 'green',
            '&:hover': {
              backgroundColor: lesson.enabled ? 'darkred' : 'darkgreen', 
            },
          }}
          onClick={() => handleToggleLesson(lesson)}
          style={{ color: 'white' }} 
        >
        {lesson.enabled ? 'Disable Lesson' : 'Enable Lesson'}
      </Button>
    </Box>
  </Card>
);

export default withAuth(UtilitiesShadow);
