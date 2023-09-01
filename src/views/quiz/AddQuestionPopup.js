import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid } from '@mui/material';

const AddQuestionPopup = ({ open, onClose }) => {
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleRadioChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleClose = () => {
    setCorrectAnswer(''); // Clear the selected answer when closing the popup
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Add New Question</DialogTitle>
      <DialogContent>
        <form className="pt-3 pb-3">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Video Description" variant="outlined" fullWidth margin="normal" id="videoUpload" type="file" InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Text Description" variant="outlined" fullWidth margin="normal" id="textDescription" type="text" InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}/>
            </Grid>

            {/* Answer Choices */}
            <Grid item xs={12}>
              <label htmlFor="AnswerChoices">Answer Choices</label>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Choice 1" variant="outlined" fullWidth id="Choice1" type="text" InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}/>
            </Grid>
            <Grid item xs={12}>
            <TextField label="Choice 2" variant="outlined" fullWidth id="Choice2" type="text" InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}/>
            </Grid>
            <Grid item xs={12}>
            <TextField label="Choice 3" variant="outlined" fullWidth id="Choice3" type="text" InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}/>
            </Grid>
            <Grid item xs={12}>
            <TextField label="Choice 4" variant="outlined" fullWidth id="Choice4" type="text" InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}/>
            </Grid>

            {/* Correct Answer */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{color:'black'}}>
                  Correct Answer
                </FormLabel>
                <RadioGroup aria-label="correct-answer" name="correct-answer" value={correctAnswer} onChange={handleRadioChange} sx={{display: 'flex',flexDirection: 'row'}}>
                  <FormControlLabel value="choice1" control={<Radio />} label="Choice 1" />
                  <FormControlLabel value="choice2" control={<Radio />} label="Choice 2" />
                  <FormControlLabel value="choice3" control={<Radio />} label="Choice 3" />
                  <FormControlLabel value="choice4" control={<Radio />} label="Choice 4" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          {/* Buttons */}
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'20px'}}>
            <Button variant="contained" color="error" onClick={onClose}>
              Discard Changes
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose} sx={{color:'white', padding:'0px 20px'}}>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionPopup;
