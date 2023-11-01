import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalUsersCard from 'ui-component/cards/Skeleton/TotalUsersCard';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL PREMIUM USERS CARD ||============================== //

const TotalPremiumUsersCard = ({ isLoading }) => {
  const theme = useTheme();
  const [totalPremiumUsers, setTotalPremiumUsers] = useState(null);

  useEffect(() => {
    // Make the API request to get the total premium users count
    fetch('http://172.190.66.169:8006/users/premium-users-count', {
      method: 'GET',
      headers: {
        'accept': '*/*',
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Network response was not ok:', response.status);
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming the total premium users count is in data.data[0]
        setTotalPremiumUsers(data.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching total premium users count:', error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <TotalUsersCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2 }}>
            <List sx={{ py: 0 }}>
              <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.warning.light,
                      color: theme.palette.warning.dark
                    }}
                  >
                    <StorefrontTwoToneIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={<Typography variant="h4">
                    {totalPremiumUsers !== null ? totalPremiumUsers : 'Loading...'}
                  </Typography>}
                  secondary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: theme.palette.grey[500],
                        mt: 0.5
                      }}
                    >
                      Total Premium Users
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalPremiumUsersCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalPremiumUsersCard;
