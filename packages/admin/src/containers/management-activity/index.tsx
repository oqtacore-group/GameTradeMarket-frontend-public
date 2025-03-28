import { useState } from 'react';
import { DEFAULT_ROWS_PER_PAGE, AVAILABLE_ROWS_PER_PAGE } from '@/consts';
import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import { useGetActivityQuery } from '@game-trade/lib/codegen-types';

export const ManagementActivityContainer = () => {
  const [offset, setOffset] = useState<number>(0);
  const [first, setFirst] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const { data: activity, loading } = useGetActivityQuery({
    fetchPolicy: 'no-cache',
    variables: {
      offset: offset * first,
      first,
    },
  });

  return (
    <>
      <h1>Activity</h1>

      {loading || !activity ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Token ID</TableCell>
                <TableCell>Token name</TableCell>
                <TableCell>Game</TableCell>
                <TableCell>Type event</TableCell>
                <TableCell>Seller</TableCell>
                <TableCell>Buyer</TableCell>
                <TableCell>Blockchain</TableCell>
                <TableCell>Currency</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {activity!.activity!.edges.node!.map((row: any) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.token_id}</TableCell>
                  <TableCell>{row.token_name}</TableCell>
                  <TableCell>{row.game_name}</TableCell>
                  <TableCell>{row.type_event}</TableCell>
                  <TableCell>{row.seller.nick_name}</TableCell>
                  <TableCell>{row.buyer.nick_name}</TableCell>
                  <TableCell>{row.blockchain}</TableCell>
                  <TableCell>{row.currency}</TableCell>
                  <TableCell>{row.price / 10 ** 18}</TableCell>
                  <TableCell>{row.created_at || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            sx={{ '*': { color: '#fff' } }}
            component="div"
            rowsPerPageOptions={AVAILABLE_ROWS_PER_PAGE}
            rowsPerPage={first}
            onRowsPerPageChange={(e: any) => {
              setFirst(e.target.value);
              setOffset(0);
            }}
            count={activity?.activity?.totalCount || 0}
            page={offset}
            onPageChange={(e: any) => {
              const dir = e.currentTarget.getAttribute('aria-label').includes('previous')
                ? 'prev'
                : 'next';

              setOffset(dir === 'next' ? offset + 1 : offset - 1);
            }}
          />
        </TableContainer>
      )}
    </>
  );
};
