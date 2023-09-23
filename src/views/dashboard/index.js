import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import CurrentUsers from './CurrentUsers';
import AnnualIncomeCard from './AnnualIncomeCard';
import UserAccountsCreatedCard from './UserAccountsCreatedCard';
import TotalNormalUsersCard from './TotalNormalUsersCard';
import TotalPremiumUsersCard from './TotalPremiumUsersCard';
import TotalIncomeGrowthBarChart from './TotalIncomeGrowthBarChart';
import { gridSpacing } from 'store/constant';

// ==============================|| OVERVIEW ||============================== //

const Overview = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <CurrentUsers isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <UserAccountsCreatedCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalNormalUsersCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={6} xs={12} md={6} lg={12}>
                <TotalPremiumUsersCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={8}>
            <TotalIncomeGrowthBarChart isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <AnnualIncomeCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Overview;
