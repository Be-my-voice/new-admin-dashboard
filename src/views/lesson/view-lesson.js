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

  const handleDisableLesson = (lesson) => {
    console.log(`Disabling lesson: ${lesson.title}`);
  };

  useEffect(() => {
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
            <ShadowBox lesson={lesson} handleDisableLesson={handleDisableLesson} />
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

const ShadowBox = ({ lesson, handleDisableLesson }) => (
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
      <Typography variant="h6" component="div" mt={2}>
        {lesson.title}
      </Typography>
      <Link to={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" size="small" sx={{ mt: 2, px: 4 }}>
          View Lesson
        </Button>
      </Link>
     <Button variant="contained" color="error" size="small" sx={{ mt: 2, px: 3 }} onClick={() => handleDisableLesson(lesson)}>
        Disable Lesson
      </Button>
    </Box>
  </Card>
);

export default withAuth(UtilitiesShadow);
