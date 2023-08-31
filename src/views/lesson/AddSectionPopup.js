import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Grid } from '@mui/material';

const AddSectionPopup = ({ open, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Add New Section</DialogTitle>
        <DialogContent>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Fill in the details for the new section:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Video Description"
                variant="outlined"
                fullWidth
                margin="normal"
                id="videoUpload"
                type="file"
                InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Text Description"
                variant="outlined"
                fullWidth
                margin="normal"
                id="textDescription"
                type="text"
                InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '20px', justifyContent:'space-between' , paddingTop:'0'}}>
          <Button variant="contained" color="error" onClick={onClose} style={{ paddingRight: '30px', paddingLeft:'30px' }}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Section
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSectionPopup;

