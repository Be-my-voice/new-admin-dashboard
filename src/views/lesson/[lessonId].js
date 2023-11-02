import React, { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid, Typography, Button, Divider } from '@mui/material';
import defaultVideo from '../../assets/videos/lesson/preview.mp4';
import AddSectionPopup from './AddSectionPopup';
import EditSectionPopup from './EditSectionPopup';
import DeleteLessonPopup from './DeleteLessonPopup';
import EditLessonTitlePopup from './EditLessonTitlePopup';
import DeleteSectionPopup from './DeleteSectionPopup';
import withAuth from '../withAuth';
import { Backdrop, CircularProgress } from '@mui/material';

const ViewIndividualLesson = () => {
  const { lessonId } = useParams();

  // state variables for pop-up
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteSectionPopup, setShowDeleteSectionPopup] = useState(false);
  const [showAddSectionPopup, setShowAddSectionPopup] = useState(false);
  const [showEditSectionPopup, setShowEditSectionPopup] = useState(false);
  const [sections, setSections] = useState([]); 
  const [lesson, setLesson] = useState({ title: "" });
  const [sectionIdToDelete, setSectionIdToDelete] = useState(null);
  const [sectionDataToEdit, setSectionDataToEdit] = useState(null);

  const [loading, setLoading] = useState(false);

  // Function to fetch the lesson title based on lesson ID
  const fetchLessonTitle = async () => {
    try {
      const response = await fetch(`http://172.190.66.169:8003/api/get-lesson-by-id/${lessonId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLesson({ title: data.title });
    } catch (error) {
      console.error('Error fetching lesson title:', error);
    }
  };

  // Function to handle the delete button click
  const handleDeleteButtonClick = () => {
    setShowDeletePopup(true);
  };

  const handleEditSectionButtonClick = (sectionId, sectionName, sectionDescription, video) => {
    setSectionDataToEdit({
      sectionId,
      sectionName,
      sectionDescription,
      video,
    });
    setShowEditSectionPopup(true);
  };  

  // Function to handle the edit lesson title button click
  const handleEditButtonClick = () => {
    console.log('title:;', lesson.title);
    setShowEditPopup(true);
  };

  // Function to handle the delete section button click
  const handleDeleteSectionButtonClick = (sectionId) => {
    setSectionIdToDelete(sectionId);
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
    setShowEditSectionPopup(false);
  };

  // Function to fetch sections based on lesson ID using the Fetch API
  const fetchSections = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://172.190.66.169:8003/api/get-lesson-sections-by-lesson-id/${lessonId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
    fetchLessonTitle();
  }, [lessonId]);

  return (
    <MainCard sx={{ padding: { xs: '0', md: '0 20px' } }}>
      {/* title and buttons */}
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h3" sx={{ marginBottom: { xs: '0.5rem', md: 0 } }}>
          Lesson: {lesson.title}
        </Typography>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
          <Button variant="contained" color="secondary" sx={{ color: 'white' }} onClick={handleAddSectionButtonClick}>
            Add New Section
          </Button>
          <Button variant="contained" color="primary" sx={{ paddingLeft: '35px', paddingRight: '35px', color: 'white' }} onClick={handleEditButtonClick}>
            Edit Title
          </Button>
          <Button variant="contained" color="error" sx={{ color: 'white', backgroundColor: '#f44336' }} onClick={handleDeleteButtonClick}>
            Delete Lesson
          </Button>
        </div>
      </Grid>

      <Divider sx={{ my: 2 }} />

      {/* section cards */}
      <Grid container spacing={3}>
        {sections.map((section) => (
          <Grid key={section.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ boxShadow: 5, borderRadius: '8px' }}>
              {/* include the video from BE */}
            <CardMedia component="video" controls muted height="160" > <source src={defaultVideo} type="video/mp4" /> Your browser does not support the video tag.</CardMedia>
              <CardContent>
                <Typography variant="h6" component="div" align="center">
                  {section.sectionName}
                </Typography>
                <Typography variant="body2" align="center" color="textSecondary">
                    {section.sectionDescription}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                    <Button variant="outlined" color="primary" sx={{ width: '100px',  border: '1px solid' }} 
                    onClick={() =>
                      handleEditSectionButtonClick(
                        section.id,
                        section.sectionName,
                        section.sectionDescription,
                        section.video
                      )
                    }>Edit</Button>
                    <Button variant="outlined" color="error" sx={{ width: '100px',  border: '1px solid' }} onClick={() => handleDeleteSectionButtonClick(section.id)}>Delete</Button>
                  </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add new section button */}
      <Grid container justifyContent="center" mt={3}>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            color: 'white',
            width: '100%',
            '&:hover': { backgroundColor: 'white', border: '2px solid', borderColor: 'secondary.main', color: 'secondary.main' },
          }}
          onClick={handleAddSectionButtonClick}
        >
          Add New Section
        </Button>
      </Grid>

      {/* handling pop up for deleting lesson */}
      <DeleteLessonPopup open={showDeletePopup} onClose={handleClosePopup} lessonId={lessonId}  />

      {/* handling pop up for editing lesson title */}
      <EditLessonTitlePopup open={showEditPopup} onClose={handleClosePopup} existingTitle={lesson.title} lessonId={lessonId} />

      {/* handling pop up for deleting section */}
      <DeleteSectionPopup open={showDeleteSectionPopup} onClose={handleClosePopup} sectionId={sectionIdToDelete} />

      {/* handling pop up for adding section */}
      <AddSectionPopup open={showAddSectionPopup} onClose={handleClosePopup} lessonId={lessonId} />
      
      {/* handling pop up for editing section */}
      {<EditSectionPopup open={showEditSectionPopup} onClose={handleClosePopup} sectionData={sectionDataToEdit}/>}
      <Backdrop open={loading} style={{ zIndex: 9999, color: '#fff' }}>
        <CircularProgress color="inherit" />
        Loading
      </Backdrop>
    </MainCard>
  );
};

export default withAuth(ViewIndividualLesson);