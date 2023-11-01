import React, { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
} from '@mui/material';

const AddQuestionPopup = ({ open, onClose, quizId }) => {
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');
  const [answer4, setAnswer4] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const videoInputRef = useRef(null);

  const handleRadioChange = (event) => {
    setCorrectAnswer(event.target.value);
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Video = e.target.result.split(',')[1]; 
        setVideoFile(base64Video);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setCorrectAnswer('');
    onClose();
  };

  const handleSubmit = () => {
  
    //console.log('Data:', data);
    //console.log('Data (JSON):', JSON.stringify(data));
  
    fetch(`http://172.190.66.169:8003/api/question/create-question`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizId: quizId,
        question: question,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        correctAnswer: correctAnswer,
        video: videoFile,
      }),
    })
      .then((response) => {
        console.log('Response status:', response.status); // Print response status
        return response.json();
      })
      .then((data) => {
        console.log('New question details:', data);
        onClose();
      })
      .catch((error) => {
        console.error('Error creating question:', error);
      });
  };
  
  
  

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: 'center', fontSize: '24px' }}>Add New Question</DialogTitle>
      <DialogContent>
        <form className="pt-3 pb-3" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <label htmlFor="videoUpload">Video Description</label>
              <input
                type="file"
                accept="video/*"
                style={{
                  border: '1px solid #c4c4c4',
                  borderRadius: '9px',
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  background:'#Fafafa', 
                  marginTop: '16px'
                }}
                onChange={handleVideoChange}
                ref={videoInputRef}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Text Description"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                id="textDescription"
                type="text"
                InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="AnswerChoices">Answer Choices</label>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Choice 1"
                variant="outlined"
                fullWidth
                required
                id="Choice1"
                type="text"
                InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}
                onChange={(e) => setAnswer1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Choice 2"
                variant="outlined"
                fullWidth
                required
                id="Choice2"
                type="text"
                InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}
                onChange={(e) => setAnswer2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Choice 3"
                variant="outlined"
                fullWidth
                required
                id="Choice3"
                type="text"
                InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}
                onChange={(e) => setAnswer3(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Choice 4"
                variant="outlined"
                fullWidth
                required
                id="Choice4"
                type="text"
                InputLabelProps={{ shrink: true, style: { marginBottom: 0 } }}
                onChange={(e) => setAnswer4(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend" sx={{ color: 'black' }}>
                  Correct Answer
                </FormLabel>
                <RadioGroup
                    aria-label="correct-answer"
                    name="correct-answer"
                    value={correctAnswer}
                    onChange={handleRadioChange}
                    sx={{ display: 'flex', flexDirection: 'row' }}
                  >
                    <FormControlLabel value={answer1} control={<Radio />} label="Choice 1" />
                    <FormControlLabel value={answer2} control={<Radio />} label="Choice 2" />
                    <FormControlLabel value={answer3} control={<Radio />} label="Choice 3" />
                    <FormControlLabel value={answer4} control={<Radio />} label="Choice 4" />
                  </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Discard Changes
            </Button>
            <Button variant="contained" color="primary"  type='submit' sx={{ color: 'white', padding: '0px 20px' }}>
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionPopup;
