import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import { Backdrop, CircularProgress } from '@mui/material';


const AddSectionPopup = ({ open, onClose, lessonId }) => {
  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Video = e.target.result.split(',')[1];
        setVideo(base64Video);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
  
    fetch('http://172.190.66.169:8003/api/create-lesson-section', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lessonId: lessonId,
        sectionName: sectionName,
        sectionDescription: sectionDescription,
        video: video, // Use the base64-encoded video data
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('New section details:', data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating section:', error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Add New Section</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Section Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Section Description"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={sectionDescription}
                onChange={(e) => setSectionDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="video/*"
                required
                style={{
                  border: '1px solid #c4c4c4',
                  borderRadius: '9px',
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background: '#Fafafa',
                  marginTop: '16px',
                }}
                onChange={handleVideoChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '20px', justifyContent: 'space-between', paddingTop: '0' }}>
          <Button variant="contained" color="error" onClick={onClose}>
            Discard Changes
          </Button>
          <Button type='submit' variant="contained" color="primary" sx={{ color: 'white', padding: '6px 20px' }}>
            Save Changes
          </Button>
        </DialogActions>
      </form>
      <Backdrop open={loading} style={{ zIndex: 9999, color: '#fff' }}>
          <CircularProgress color="inherit" />
          Uploading video
        </Backdrop>
    </Dialog>
  );
};

export default AddSectionPopup;
