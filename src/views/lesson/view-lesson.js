import React, { useState } from 'react';
import {Card, Box,  Grid, Toolbar, Typography, Divider, Button,} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import AddLessonPopup from './AddLessonPopup';
import { Link } from 'react-router-dom';

const UtilitiesShadow = () => {
  const [isAddLessonDialogOpen, setAddLessonDialogOpen] = useState(false);

  const handleAddLesson = (newLessonTitle) => {
    console.log('Adding new lesson with title:', newLessonTitle);
    setAddLessonDialogOpen(false);
  };

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
        {Array.from({ length: 6 }).map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <ShadowBox
              lesson={{
                lessonId: `lesson-${index}`,
                Name: `Lesson ${index}`,
                numberOfSections: '07',
              }}
            />
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

const ShadowBox = ({ lesson }) => (
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
        {lesson.Name}
      </Typography>
      <Typography variant="body2" mt={1}>
        {lesson.numberOfSections} Sections
      </Typography>
      <Link to={`/lesson/${lesson.lessonId}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" size="small" sx={{ mt: 2, px: 4 }}>
          View Lesson
        </Button>
      </Link>
    </Box>
  </Card>
);

export default UtilitiesShadow;
