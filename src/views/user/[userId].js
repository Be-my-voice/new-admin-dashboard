import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, CardHeader, Divider, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import defaultImage from 'assets/images/defaultUser.png';
import ScreenTime from '../user/ScreenTime';
import WordsTranslated from '../user/wordsTranslated';
import DisableUserPopup from './DisableUserPopup';
import { gridSpacing } from 'store/constant';
import withAuth from '../withAuth'; 
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { userId } = useParams();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDisable = () => {
    // Perform actions to disable user
    handleCloseDialog();
  };

  const handleToggleUser = () => {
    const endpoint = userData.userStatus === 'ENABLED' ? 'disable-user' : 'enable-user';
    const userId = userData.id;
  
    fetch(`http://172.190.66.169:8006/users/${endpoint}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS') {
          // Update the user status in the UI
          setUserData((prevUserData) => ({
            ...prevUserData,
            userStatus: endpoint === 'enable-user' ? 'ENABLED' : 'DISABLED',
          }));
        }
      })
      .catch((error) => {
        console.error('Error toggling user status:', error);
      });
  };

  const generateRandomTransactions = () => {
    const transactions = [];
    for (let i = 0; i < 5; i++) {
      transactions.push({
        transactionId: `T${Math.floor(Math.random() * 1000)}`,
        amount: `Rs.${Math.floor(Math.random() * 1000)}`,
        date: getRandomDate(),
      });
    }
    return transactions;
  };
  
  const getRandomDate = () => {
    const year = 2023;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 31) + 1;

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setLoading(true); 

    fetch(`http://172.190.66.169:8006/users/${userId}`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS') {
          // Set the user data in the state
          const user = data.data[0];
          user.purchaseHistory = generateRandomTransactions();
          user.lastLogin = user.lastLogin.split('T')[0];
          setUserData(user);
          setLoading(false); // Set loading to false after fetching data
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading (false);
      });
  }, [userId]);

  // Render user data when available
  if (isLoading || !userData) {
    return (
      <MainCard>
        {/* Loading indicator or error message */}
      </MainCard>
    );
  }

  return (
    <MainCard sx={{ padding: { xs: '0', md: '0 20px'}}}>

      <Typography variant="h3" style={{marginBottom:'5px'}}>{userData.fullName}</Typography>
      <Typography variant="subtitle2" color="textSecondary">
        Last Active: {userData.lastLogin}
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
                <img src={defaultImage} alt="User" style={{ width: '150px', height: '150px', borderRadius: '50%', }} />
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
                  {"+94 71 1154 1753"}
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
                  {userData.userRole}
                  </Typography>
                </div>
              </div>

              {/* Toggle User Button */}
              <Button
                variant="contained"
                size="small"
                sx={{
                  mt: 2,
                  px: 3,
                  width: '100%' ,
                  backgroundColor: userData.userStatus === 'ENABLED' ? 'green' : 'red',
                  '&:hover': {
                    backgroundColor: userData.userStatus === 'ENABLED' ? 'darkgreen' : 'darkred',
                  },
                }}
                onClick={() => handleToggleUser(userData)}
                style={{ color: 'white' }}
              >
                {userData.userStatus === 'ENABLED' ? 'Disable User' : 'Enable User'}
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
            <CardHeader title="Payment History" titleTypographyProps={{sx: { color: 'white', textAlign: 'center'}}} sx={{ bgcolor: 'primary.main' }} />
            <Divider />
            <TableContainer style={{ maxHeight: '235px', minHeight:'235px', overflowY:'scroll' }}>
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

export default withAuth(UserProfile);
