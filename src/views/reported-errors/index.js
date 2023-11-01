import React, { useState, useEffect } from 'react';
import withAuth from '../withAuth';

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
  // const errorReports = [
  //   {
  //     id: 1,
  //     username: 'Sivakarthikeyan Doss',
  //     issue: 'The front camera doesn’t work ',
  //     description: 'This is a detailed description of the issue...',
  //     timestamp: '2023-09-23',
  //     uploadedMedia: 'media-file.jpg', // Example media file name
  //   },
  //   {
  //     id: 2,
  //     username: 'Rushdha Rasheed',
  //     issue: 'The front camera doesn’t work ',
  //     description: 'Another detailed description of the issue...',
  //     timestamp: '2023-09-23',
  //     uploadedMedia: 'media-file.png', // Example media file name
  //   },
  //   // Add more error reports here
  // ];

  // State for controlling the dialog
  const [errorReports, setErrorReports] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    console.log(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedReport(null);
    setOpenDialog(false);
  };

  // useEffect(() => {
  //   // Fetch error reports from the API when the component mounts
  //   fetch('http://172.190.66.169:8006/errors', {
  //     method: 'GET',
  //     headers: {
  //       'accept': '*/*',
  //       // You can add more headers here if required
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Assuming the error reports are in data.data
  //       console.log(data.data[0]);
  //       setErrorReports(data.data[0]);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching error reports:', error);
  //     });
  // }, []);


  useEffect(() => {
    async function getErrorsWithUserNames() {
      try {
        // Step 1: Fetch errors from the errors route
        const errorsResponse = await fetch('http://172.190.66.169:8006/errors');
        const errorsData = await errorsResponse.json();

        // console.log(errorsData.data);
    
        if (!errorsData.data || errorsData.data.length === 0) {
          return []; // No errors found
        }
    
        // Step 2: Fetch user details for each error and add userName
        const errorsWithUserNames = await Promise.all(errorsData.data[0].map(async (error) => {
          const userResponse = await fetch(`http://172.190.66.169:8006/users/${error.userId}`);
          const userData = await userResponse.json();

          console.log(userData.data)

          if (userData.data[0] && userData.data[0].name) {
            console.log("ASGDJHASGD")
            console.log(userData.data[0].name);
            error.userName = userData.data[0].name;
            console.log(error);
          } else {
            console.log(userData.data && userData.data.name);
            error.userName = 'Unknown User'; // Default value if user data is not available
          }
          return error;
        }));

        // console.log(errorsWithUserNames);
    
        return errorsWithUserNames;
      } catch (error) {
        console.error('An error occurred:', error);
        return [];
      }
    } 
    getErrorsWithUserNames().then((errorsWithUserNames) => {
      setErrorReports(errorsWithUserNames);
    });

  }, []);

    

  

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="div">
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
                          <Avatar alt={error.userName}/>
                        </Grid>
                        <Grid item>{error.userName}</Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>{error.message}</TableCell>
                    <TableCell>{error.createdAt}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          
                          handleViewDetails(error)}
                        }
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
                  Status
                </Typography>
                <Typography variant="subtitle1">{selectedReport.status}</Typography>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <Typography variant="h6" style={{ color: '#147B72' }}>
                  Description
                </Typography>
                <Typography variant="body1">{selectedReport.message}</Typography>
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

export default withAuth(ErrorReports);