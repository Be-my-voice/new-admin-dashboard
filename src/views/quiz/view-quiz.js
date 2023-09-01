import React from 'react';
import { Box, Card, Grid, Toolbar, Typography, Divider, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import { Link } from 'react-router-dom';

const quiz = {
  quizId: 'quiz123',
  Name: 'Week Days',
  numberOfSections: '07',
};

const ShadowBox = ({ quiz }) => (
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
        {quiz.Name}
      </Typography>
      <Typography variant="body2" mt={1}>
        {quiz.numberOfSections} Sections
      </Typography>
      <Link to={`/quiz/${quiz.quizId}`} style={{ textDecoration: 'none' }}>
      <Button variant="contained" color="primary" size="small" sx={{ mt: 2, px: 4 }}>
        View quiz
      </Button></Link>
    </Box>
  </Card>
);

const UtilitiesShadow = () => (
  <MainCard>
    {/* Custom Toolbar */}
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="h4">Quizzes</Typography>
      <SearchSection />
    </Toolbar>
    <Divider />
    <Grid container spacing={gridSpacing} mt={2}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <ShadowBox quiz={quiz} />
        </Grid>
      ))}
    </Grid>
  </MainCard>
);

export default UtilitiesShadow;
