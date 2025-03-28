import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
import { useStatisticsAdminQuery } from '@game-trade/lib/src/codegen-types';

const selectBlockchainColor = (blockchain: string) => {
  switch (blockchain) {
    case 'polygon':
      return '#7943ce';
    case 'binance':
      return '#eac332';
    case 'ethereum':
      return '#8791b1';
  }
};

export const DashboardContainer = () => {
  const { data: statistics, loading: statisticsLoading } = useStatisticsAdminQuery();

  if (statisticsLoading) return <CircularProgress />;

  return (
    <>
      <h1>Dashboard</h1>

      {statistics?.statisticsAdmin.table && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={5} sx={{ fontSize: '24px' }}>
                  Stats
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell>All time</TableCell>
                <TableCell>Last 24 hours</TableCell>
                <TableCell>Last 30 days</TableCell>
                <TableCell>24 hours (only first-timers)</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {statistics.statisticsAdmin.table.map((row) => (
                <TableRow
                  key={row.value}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.value}</TableCell>
                  <TableCell>{row.allTime}</TableCell>
                  <TableCell>{row.for24hours}</TableCell>
                  <TableCell>{row.for30days}</TableCell>
                  <TableCell>{row.value === 'Users' ? '-' : row.onlyFirstTime24hours}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <br />
      <br />

      <h2>Listings across chains</h2>

      <Card sx={{ backgroundColor: '#fcfcfc', width: '393px' }}>
        <CardContent>
          <PieChart width={370} height={230}>
            <Legend />

            <Pie
              dataKey="value"
              data={statistics?.statisticsAdmin?.blockchainsChart?.map((b: any) => {
                return {
                  name: b.blockchain,
                  value: +b.count,
                  fill: selectBlockchainColor(b.blockchain),
                };
              })}
              cx={170}
              cy={100}
              innerRadius={40}
              outerRadius={80}
            />

            <Tooltip />
          </PieChart>
        </CardContent>
      </Card>
    </>
  );
};
