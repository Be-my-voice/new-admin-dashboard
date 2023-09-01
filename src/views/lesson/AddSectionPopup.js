import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';

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
          <Button variant="contained" color="error" onClick={onClose}>
            Discard Changes
          </Button>
          <Button type="submit" variant="contained" color="primary" sx={{color:'white', padding:'6px 20px'}}>
            Save Changes
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddSectionPopup;

