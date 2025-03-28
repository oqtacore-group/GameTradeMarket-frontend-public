import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';

import { useWalletsLazyQuery, useWalletsCountLazyQuery } from '@game-trade/lib/src/codegen-types';

import { DEFAULT_ROWS_PER_PAGE, AVAILABLE_ROWS_PER_PAGE } from '../../consts';

export const ManagementWalletsContainer = () => {
  const [offset, setOffset] = useState<number>(0);
  const [first, setFirst] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const [fetchWallets, { data: wallets, loading: walletsLoading }] = useWalletsLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [fetchWalletsCount, { data: walletsCount }] = useWalletsCountLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    fetchWalletsCount();
    fetchWallets({ variables: { offset: offset * first, first } });
  }, [offset, first, fetchWallets, fetchWalletsCount]);

  if (walletsLoading) return <CircularProgress />;

  return (
    <>
      <h1>Wallets</h1>

      {wallets && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Wallet address</TableCell>
                <TableCell>Wallet Name</TableCell>
                <TableCell>Date of Creation</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {wallets.wallets!.map((w: any) => (
                <TableRow
                  key={w.address}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{w.user_id}</TableCell>
                  <TableCell>{w.user.email}</TableCell>
                  <TableCell>{w.address}</TableCell>
                  <TableCell>{w.name}</TableCell>
                  <TableCell>{new Date(+w.create_time).toISOString()}</TableCell>
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
            count={walletsCount?.walletsCount?.total || 0}
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
