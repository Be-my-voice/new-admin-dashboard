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
  Avatar,
} from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';

// Import the TotalSalesCard component
import TotalSalesCard from './TotalSalesCard'; 
import DailySalesChart from './DailySalesChart';
import ChangePriceCard from './ChangePriceCard';
import withAuth from '../withAuth';

const CardWrapper = MainCard;

// Create a new component for Sales
const Sales = ({ isLoading }) => {
  // For this example, let's assume you have sales data
  const salesData = [
    {
      id: 1,
      username: 'Rushdha Rasheed',
      amount:2000,
      status: 'Pending',
      datePaid: 'N/A',
      displayPicture: 'user-a.jpg', // Add the URL to the user's display picture
    },
    {
      id: 2,
      username: 'Sivakarthikeyan Doss',
      amount: 2000,
      status: 'Paid',
      datePaid: '2023-09-24',
      displayPicture: 'user-b.jpg', // Add the URL to the user's display picture
    },
    {
      id: 2,
      username: 'Khadijah Azward',
      amount:2000,
      status: 'Pending',
      datePaid: 'N/A',
      displayPicture: 'user-b.jpg', // Add the URL to the user's display picture
    }
    // Add more sales data here
  ];

  return (
    <Grid container spacing={3}>
      {/* Cards */}
      <Grid item xs={12} md={4}>
        <TotalSalesCard isLoading={isLoading} />
      </Grid>
      <Grid item xs={12} md={4}>
      <CardWrapper border={false} content={false} sx={{ backgroundColor: '#147B72', color: '#fff' }}>
          <DailySalesChart />
        </CardWrapper>
      </Grid>
      <Grid item xs={12} md={4}>
        <ChangePriceCard />
      </Grid>

      {/* Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Payments Due This Month
            </Typography>
            {isLoading ? (
              <p>Loading sales data...</p>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Amount (Rs)</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date Paid</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salesData.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar
                            alt={sale.username}
                            src={sale.displayPicture}
                            sx={{ width: 30, height: 30, marginRight: 1 }}
                          />
                          {sale.username}
                        </div>
                      </TableCell>
                      <TableCell>{sale.amount}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          sx={{
                            fontFamily: 'inherit',
                            fontWeight: 'inherit',
                            color: sale.status === 'Paid' ? 'green' : 'red',
                          }}
                        >
                          {sale.status}
                        </Typography>
                      </TableCell>
                      <TableCell>{sale.datePaid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withAuth(Sales);
