import React, { useState } from 'react';

// material-ui
import { 
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar} from '@mui/material';

// ==============================|| ERROR REPORTS ||============================== //

const ErrorReports = ({ isLoading }) => {
  // For this example, let's assume you have an array of error reports
  const errorReports = [
    {
      id: 1,
      username: 'Sivakarthikeyan Doss',
      issue: 'The front camera doesn’t work ',
      description: 'This is a detailed description of the issue...',
      timestamp: '2023-09-23',
      uploadedMedia: 'media-file.jpg', // Example media file name
    },
    {
      id: 2,
      username: 'Rushdha Rasheed',
      issue: 'The front camera doesn’t work ',
      description: 'Another detailed description of the issue...',
      timestamp: '2023-09-23',
      uploadedMedia: 'media-file.png', // Example media file name
    },
    // Add more error reports here
  ];

  // State for controlling the dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedReport(null);
    setOpenDialog(false);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            Error Reports
          </Typography>
          {isLoading ? (
            <p>Loading error reports...</p>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Issue</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>View Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {errorReports.map((error) => (
                  <TableRow key={error.id}>
                    <TableCell>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item>
                          <Avatar alt={error.username}/>
                        </Grid>
                        <Grid item>{error.username}</Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{error.issue}</TableCell>
                    <TableCell>{error.timestamp}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => handleViewDetails(error)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>View Error Report</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <Typography variant="h6" style={{ color: '#147B72' }}>
                  Issue
                </Typography>
                <Typography variant="subtitle1">{selectedReport.issue}</Typography>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Typography variant="h6" style={{ color: '#147B72' }}>
                  Description
                </Typography>
                <Typography variant="body1">{selectedReport.description}</Typography>
              </div>
              <div>
                <Typography variant="h6" style={{ color: '#147B72' }}>
                  Uploaded Media
                </Typography>
                {selectedReport.uploadedMedia && (
                  <img
                    src={selectedReport.uploadedMedia}
                    alt="Uploaded Media"
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                )}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default ErrorReports;