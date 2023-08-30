import React,{ useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardHeader, Divider, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import defaultImage from 'assets/images/defaultUser.png';
import ScreenTime from '../user/ScreenTime';
import WordsTranslated from '../user/wordsTranslated';
import DisableUserPopup from './DisableUserPopup';
import { gridSpacing } from 'store/constant';

const UserProfile = () => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDisableClick = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDisable = () => {
    // Perform actions to disable user
    handleCloseDialog();
  };

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const userData = {
    fullName: 'Joshua Johns',
    lastActiveDate: 'August 30, 2023',
    email: 'joshuajohns@gmail.com',
    image: defaultImage,
    contactNumber: '+94 77 824 9346',
    membershipCategory: 'Premium',
    screenTime: '2 hours 55 minutes',
    wordsTranslated: 5000,
    purchaseHistory: [
      { transactionId: '12345', amount: '$50', date: 'August 25, 2023' },
      { transactionId: '67890', amount: '$30', date: 'September 15, 2023' },
      { transactionId: '72345', amount: '$50', date: 'October 25, 2023' },
      { transactionId: '86345', amount: '$50', date: 'November 25, 2023' },
    ],
  };

  return (
    <MainCard sx={{ padding: { xs: '0', md: '0 20px'}}}>

      <Typography variant="h3" style={{marginBottom:'5px'}}>{userData.fullName}</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Last Active: {userData.lastActiveDate}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Card sx={{ bgcolor: 'primary.light', color: 'grey.800', boxShadow: 5 }}>
            <CardHeader title="Account Details" titleTypographyProps={{sx: { color: 'white', textAlign: 'center'}}} sx={{ bgcolor: 'primary.main'}} />
            <Divider />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', }}>
              
              {/* user image */}
              <div style={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <img src={userData.image} alt="User" style={{ width: '150px', height: '150px', borderRadius: '50%', }} />
              </div>
              
              {/* email */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom:'10px'}} >
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '13px', marginLeft:'5px', }} color="textSecondary">
                  Email:
                </Typography>
                <div style={{ width: '100%', background: 'white', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '8px' }}>
                  <Typography variant="body2" color="textPrimary">
                    {userData.email}
                  </Typography>
                </div>
              </div>

              {/* number */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom:'10px'}} >
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '13px', marginLeft:'5px', }} color="textSecondary">
                Contact Number:
                </Typography>
                <div style={{ width: '100%', background: 'white', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '8px' }}>
                  <Typography variant="body2" color="textPrimary">
                  {userData.contactNumber}
                  </Typography>
                </div>
              </div>

              {/* membership */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom:'10px'}} >
                <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '13px', marginLeft:'5px', }} color="textSecondary">
                  Membership:
                </Typography>
                <div style={{ width: '100%', background: 'white', borderRadius: '10px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', padding: '8px' }}>
                  <Typography variant="body2" color="textPrimary">
                  {userData.membershipCategory}
                  </Typography>
                </div>
              </div>

              <Button variant="contained" color="error" sx={{ mt: 2, width: '100%' }} onClick={handleDisableClick}>
                Disable User
              </Button>

              <DisableUserPopup open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleConfirmDisable} />
            </CardContent>

          </Card>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
            <Grid container spacing={gridSpacing} sx={{marginBottom:'25px'}}>
            {/* screen time card  */}
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <ScreenTime isLoading={isLoading} />
              </Grid>
            {/* screen time card  */}
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <WordsTranslated isLoading={isLoading} />
              </Grid>
            </Grid>

          <Card sx={{ bgcolor: 'primary.light', color: 'grey.800', boxShadow: 5 }}>
            <CardHeader title="Payment History" titleTypographyProps={{sx: { color: 'white', textAlign: 'center'}}} sx={{ bgcolor: 'primary.main'}} />
            <Divider />
            <TableContainer style={{ maxHeight: '235px', minHeight:'235px', overflowY:'scroll'}}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Transaction ID</TableCell>
                    <TableCell align="center">Amount</TableCell>
                    <TableCell align="center">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData.purchaseHistory.map((purchase, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{purchase.transactionId}</TableCell>
                      <TableCell align="center">{purchase.amount}</TableCell>
                      <TableCell align="center">{purchase.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default UserProfile;
