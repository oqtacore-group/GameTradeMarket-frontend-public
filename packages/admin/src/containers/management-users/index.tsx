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
import { useUsersLazyQuery, useUsersCountLazyQuery } from '@game-trade/lib/src/codegen-types';
import { DEFAULT_ROWS_PER_PAGE, AVAILABLE_ROWS_PER_PAGE } from '../../consts';

export const ManagementUsersContainer = () => {
  const [offset, setOffset] = useState<number>(0);
  const [first, setFirst] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const [fetchUsers, { data: users, loading: usersLoading }] = useUsersLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [fetchUsersCount, { data: usersCount }] = useUsersCountLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    fetchUsersCount();
    fetchUsers({ variables: { offset: offset * first, first } });
  }, [offset, first, fetchUsers, fetchUsersCount]);

  return (
    <>
      <h1>Users</h1>

      {usersLoading || !users ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Nickname</TableCell>
                <TableCell>Last visited</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users!.users!.edges.node!.map((row: any) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.nick_name}</TableCell>
                  <TableCell>{row.last_visited || '-'}</TableCell>
                  <TableCell>{row.roles[0]?.code || '-'}</TableCell>
                  <TableCell>
                    <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>
                      Transactions history
                    </a>
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
