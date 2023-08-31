import React from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, Box, Typography } from '@mui/material';

const EditLessonTitlePopup = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Edit Lesson Title</DialogTitle>
      <DialogContent sx={{ padding: '20px 30px' }}>
        <form>
          <Box sx={{ marginBottom: '20px' }}>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Enter a new title for the lesson:
            </Typography>
            <TextField
              label="Lesson Title"
              variant="outlined"
              fullWidth
              id="lessonTitle"
              InputProps={{ style: { border: '1px solid #147B72', outline: 'none', boxShadow: 'none' } }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent:'space-between' }}>
            <Button variant="contained" color="error" onClick={onClose} >
              Discard Changes
            </Button>
            <Button variant="contained" color="primary" sx={{ paddingRight: '20px', paddingLeft: '20px' }}>
              Save Changes
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditLessonTitlePopup;

