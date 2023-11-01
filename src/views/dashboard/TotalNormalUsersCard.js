import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalUsersCard from 'ui-component/cards/Skeleton/TotalUsersCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.light,
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
    borderRadius: '50%',
    top: -160,
    right: -130
  }
}));

// ==============================|| DASHBOARD - TOTAL NORMAL USERS CARD ||============================== //

const TotalNormalUsersCard = ({ isLoading }) => {
  const theme = useTheme();
  const [totalNormalUsers, setTotalNormalUsers] = useState(null);
  useEffect(() => {
    // Make the API request to get the total normal users count
    fetch('http://172.190.66.169:8006/users/normal-users-count', {
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
        // Assuming the total normal users count is in data.data[0]
        setTotalNormalUsers(data.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching total normal users count:', error);
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
                      backgroundColor: theme.palette.primary[800],
                      color: '#fff'
                    }}
                  >
                    <TableChartOutlinedIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    py: 0,
                    mt: 0.45,
                    mb: 0.45
                  }}
                  primary={
                    <Typography variant="h4" sx={{ color: '#fff' }}>
                      {totalNormalUsers !== null ? totalNormalUsers : 'Loading...'}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                      Total Normal Users
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

TotalNormalUsersCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalNormalUsersCard;
