import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Grid,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

import EarningIcon from 'assets/images/icons/earning.svg';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const CardWrapper = MainCard;

const TotalSalesCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: '#147B72',
                    mt: 1,
                  }}
                >
                  <img src={EarningIcon} alt="Notification" />
                </Avatar>
              </Grid>
              <Grid item>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#147B72',
                    color: '#fff',
                    zIndex: 1,
                  }}
                  aria-controls="menu-total-sales-card"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreHorizIcon fontSize="inherit" />
                </Avatar>
                <Menu
                  id="menu-total-sales-card"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  variant="selectedMenu"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography
                  sx={{
                    fontSize: '2.125rem',
                    fontWeight: 500,
                    mr: 1,
                    mt: 1.75,
                    mb: 0.75,
                  }}
                >
                  Rs. 126,000
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    cursor: 'pointer',
                    width: 30,
                    height: 30,
                    backgroundColor: '#147B72',
                    color: '#fff',
                  }}
                >
                  <ArrowUpwardIcon
                    fontSize="inherit"
                    sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                  />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mb: 1.25 }}>
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 500,
                color: '#147B72',
              }}
            >
              Total Sales
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CardWrapper>
  );
};

export default TotalSalesCard;
