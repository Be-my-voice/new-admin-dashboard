import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import withAuth from '../withAuth';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
//import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalUsersCard';

// assets
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.primary.main,
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(210.04deg, ${theme.palette.primary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
    borderRadius: '50%',
    top: -30,
    right: -180,
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: `linear-gradient(140.9deg, ${theme.palette.primary.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
    borderRadius: '50%',
    top: -160,
    right: -130,
  },
}));

// Screen time values array
const screenTimeValues = [
  '2 hours 55 minutes',
  '1 hour 30 minutes',
  '3 hours 15 minutes',
  '4 hours 10 minutes',
  '2 hours 20 minutes',
];

const TotalIncomeLightCard = ({ isLoading }) => {
  const theme = useTheme();
  const [randomScreenTime, setRandomScreenTime] = useState('');

  useEffect(() => {
    if (!isLoading) {
      // Generate a random index to select a random screen time value
      const randomIndex = Math.floor(Math.random() * screenTimeValues.length);
      setRandomScreenTime(screenTimeValues[randomIndex]);
    }
  }, [isLoading]);

  return (
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
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.primary.dark,
                }}
              >
                <AccessTimeFilledIcon fontSize="inherit" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{
                py: 0,
                mt: 0.45,
                mb: 0.45,
              }}
              primary={<Typography variant="h4">{randomScreenTime}</Typography>}
              secondary={
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mt: 0.5,
                  }}
                >
                  Screen Time
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </CardWrapper>
  );
};

TotalIncomeLightCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default withAuth(TotalIncomeLightCard);
