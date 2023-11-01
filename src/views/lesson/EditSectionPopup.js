import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

const EditSectionPopup = ({ open, onClose, sectionData }) => {
    const [newSectionName, setNewSectionName] = useState('');
    const [newSectionDescription, setNewSectionDescription] = useState('');
    const [newVideo, setNewVideo] = useState('');
    const [sectionId, setSectionId] = useState(''); 
  
    useEffect(() => {
      if (sectionData) {
        const { sectionId, sectionName, sectionDescription, video } = sectionData;
        //console.log('data:', sectionData);
        setSectionId(sectionId); 
        setNewSectionName(sectionName || '');
        setNewSectionDescription(sectionDescription || '');
        setNewVideo(video || '');
      }
    }, [sectionData]);
  
    const handleVideoChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setNewVideo(file.name);
      }
    };

    const updateSection = async () => {
        try {
          const response = await fetch(`http://172.190.66.169:8003/api/update-lesson-section/${sectionId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sectionName: newSectionName,
              sectionDescription: newSectionDescription,
              video: newVideo,
            }),
          });
      
          if (response.status === 200) {
            onClose();
          } else {
            console.error('Failed to update the section:', response.status);
          }
        } catch (error) {
          console.error('Error updating lesson section:', error);
        }
      };
      

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={updateSection}>
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Edit Section</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Section Name"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Section Description"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                value={newSectionDescription}
                onChange={(e) => setNewSectionDescription(e.target.value)}
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
          <Button type="submit" variant="contained" color="primary" sx={{ color: 'white', padding: '6px 20px' }}>
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditSectionPopup;
