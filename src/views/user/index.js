import React, { useState, useEffect } from 'react';
import { Box, Card, Grid, Toolbar, Typography, Divider, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import SearchSection from '../../layout/MainLayout/Header/SearchSection';
import logo from 'assets/images/defaultUser.png';
import DisableUserPopup from './DisableUserPopup';
import { Link } from 'react-router-dom';
import withAuth from '../withAuth';

const ShadowBox = ({ user }) => {
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
        {/* User Image */}
        {/* if empty or string, it'll display default dp */}
        <img src={user.profilePictureUrl === '' || user.profilePictureUrl === 'string' ? logo : user.profilePictureUrl} alt="User" style={{ width: '100px', height: '100px', borderRadius: '50%' }}/>

        {/* User Name */}
        <Typography variant="h6" component="div" mt={2}>
          {user.name}
        </Typography>

        {/* User Email */}
        <Typography variant="body2" mt={1}>
          {user.email}
        </Typography>

        {/* View Profile Button */}
        <Link to={`/user/${user.userID}`} style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="small" sx={{ mt: 2, px: 8 }}>
            View Profile
          </Button>
        </Link>

        {/* Disable User Button */}
        <Button variant="contained" color="error" size="small" sx={{ mt: 2, px: 8 }} onClick={handleDisableClick}>
          Disable User
        </Button>

        <DisableUserPopup open={dialogOpen} onClose={handleCloseDialog} onConfirm={handleConfirmDisable} />
      </Box>
    </Card>
  );
};

const UtilitiesShadow = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://api-be-my-voice.azurewebsites.net/api/user/get-all-users', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          //console.log(data.data);
          setUsers(data.data);
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
        <SearchSection />
      </Toolbar>
      <Divider />
      <Grid container spacing={gridSpacing} mt={1}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {users.map((user, index) => (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <ShadowBox user={user} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default withAuth(UtilitiesShadow);
