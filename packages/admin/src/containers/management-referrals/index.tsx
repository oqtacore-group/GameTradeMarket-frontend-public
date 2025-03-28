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
import { useReferralsLazyQuery, useUsersCountLazyQuery } from '@game-trade/lib/src/codegen-types';
import { DEFAULT_ROWS_PER_PAGE, AVAILABLE_ROWS_PER_PAGE } from '../../consts';

export const ManagementReferralsContainer = () => {
  const [offset, setOffset] = useState<number>(0);
  const [first, setFirst] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const [fetchReferrals, { data: users, loading: usersLoading }] = useReferralsLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [fetchUsersCount, { data: usersCount }] = useUsersCountLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    fetchUsersCount();
    fetchReferrals({ variables: { offset: offset * first, first } });
  }, [offset, first, fetchReferrals, fetchUsersCount]);

  return (
    <>
      <h1>Referrals</h1>

      {usersLoading || !users ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nickname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Wallets</TableCell>
                <TableCell>Promo Code</TableCell>
                <TableCell>Referrer link</TableCell>
                <TableCell>Invited By</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users!.users!.edges.node!.map((row: any) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nick_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.wallets.map((wallet: any) => (
                      <div key={row.id + Math.random()}>{wallet.address}</div>
                    ))}
                  </TableCell>
                  <TableCell>{row.promoCode}</TableCell>
                  <TableCell>
                    <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>
                      {/*n/a*/}
                      {row.referrerLink}
                    </a>
                  </TableCell>
                  <TableCell>
                    {row.invitedBy}
                    {/*<a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>*/}
                    
                    {/*</a>*/}
                  </TableCell>
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
            count={usersCount?.usersCount?.total || 0}
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
