import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, Toolbar, Typography, Divider, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
//import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import logo from 'assets/images/defaultUser.png';
import DisableUserPopup from './DisableUserPopup';
import { Link } from 'react-router-dom';
import generateUserReport from './UserReport';
import withAuth from '../withAuth';

const ShadowBox = ({ user, handleToggleUser }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmDisable = () => {
    // Perform actions to disable user
    handleCloseDialog();
  };

  return (
    <Card sx={{ mb: 3, boxShadow: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 4.5,
          bgcolor: 'primary.light',
          color: 'grey.800',
        }}
      >
        {/* Default User Image */}
        <img src={logo} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

        {/* User Name */}
        <Typography variant="h6" component="div" mt={2}>
          {user.name}
        </Typography>

        {/* User Email */}
        <Typography variant="body2" mt={1}>
          {user.email}
        </Typography>

        {/* View Profile Button */}
        <Link to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="small" sx={{ mt: 2, px: 8 }}>
            View Profile
          </Button>
        </Link>

        {/* Toggle User Button */}
        <Button
          variant="contained"
          size="small"
          sx={{
            mt: 2,
            px: 3,
            backgroundColor: user.userStatus === 'ENABLED' ? 'green' : 'red',
            '&:hover': {
              backgroundColor: user.userStatus === 'ENABLED' ? 'darkgreen' : 'darkred',
            },
          }}
          onClick={() => handleToggleUser(user)}
          style={{ color: 'white' }}
        >
          {user.userStatus === 'ENABLED' ? 'Disable User' : 'Enable User'}
        </Button>

        <DisableUserPopup open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleConfirmDisable} />
      </Box>
    </Card>
  );
};

const UtilitiesShadow = () => {
  const [users, setUsers] = useState([]);

  const handleGenerateReport = () => {
    // Fetch premium users count
    fetch('http://172.190.66.169:8006/users/premium-users-count', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS') {
          const premiumUsersCount = data.data[0];
          
          // Now, fetch normal users count
          fetch('http://172.190.66.169:8006/users/normal-users-count', {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.status === 'SUCCESS') {
                const normalUsersCount = data.data[0];
                
                // Call the generateUserReport function with the user data and counts
                generateUserReport(users, premiumUsersCount, normalUsersCount);
              } else {
                console.error('Error fetching normal users count:', data.message);
              }
            })
            .catch((error) => {
              console.error('Error fetching normal users count:', error);
            });
        } else {
          console.error('Error fetching premium users count:', data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching premium users count:', error);
      });
  };
  

  const handleToggleUser = (user) => {
    const endpoint = user.userStatus === 'ENABLED' ? 'disable-user' : 'enable-user';
    const userId = user.id;

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
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.id === userId ? { ...u, userStatus: endpoint === 'enable-user' ? 'ENABLED' : 'DISABLED' } : u
            )
          );
        }
      })
      .catch((error) => {
        console.error('Error toggling user status:', error);
      });
  };

  useEffect(() => {
    fetch('http://172.190.66.169:8006/users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS') {
          // Filter users with userRole as "NORMAL_USER" or "PREMIUM_USER"
          const filteredUsers = data.data[0].filter(
            (user) => user.userRole === 'NORMAL_USER' || user.userRole === 'PREMIUM_USER'
          );
          setUsers(filteredUsers);
        }
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <MainCard>
      {/* Custom Toolbar */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h3" component="div">
          Users
        </Typography>
        {/* Add the "Generate User Report" button */}
        <Button variant="contained" color="primary" sx={{ color: 'white' }} onClick={handleGenerateReport}>
          Generate User Report
        </Button>
      </Toolbar>
      <Divider />
      <Grid container spacing={gridSpacing} mt={1}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {users.map((user, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ShadowBox user={user} handleToggleUser={handleToggleUser} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default withAuth(UtilitiesShadow);
