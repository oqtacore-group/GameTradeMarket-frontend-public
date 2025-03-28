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

import { useLogsLazyQuery, useLogsCountLazyQuery } from '@game-trade/lib/src/codegen-types';

import { DEFAULT_ROWS_PER_PAGE, AVAILABLE_ROWS_PER_PAGE } from '../../consts';

export const LogsContainer = () => {
  const [offset, setOffset] = useState<number>(0);
  const [first, setFirst] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const [fetchLogs, { data: logsData, loading: logsLoading }] = useLogsLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [fetchLogsCount, { data: logsCount }] = useLogsCountLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    fetchLogsCount();
    fetchLogs({ variables: { offset: offset * first, first } });
  }, [offset, first, fetchLogs, fetchLogsCount]);

  if (logsLoading || !logsData) return <CircularProgress />;

  return (
    <>
      <h1>Logs</h1>

      <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
        <Table
          sx={{
            minWidth: 650,
            'th, td': { color: '#fff' },
          }}>
          <TableHead>
            <TableRow>
              <TableCell>Event name</TableCell>
              <TableCell>Create at</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Context</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {logsData?.logs.edges.node!.map((log: any) => (
              <TableRow
                key={log.createAt}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{log.eventName}</TableCell>
                <TableCell>{log.createAt}</TableCell>
                <TableCell>{log.duration}</TableCell>
                <TableCell>{log.context}</TableCell>
                <TableCell>{log.response}</TableCell>
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
          count={logsCount?.logsCount?.total || 0}
          page={offset}
          onPageChange={(e: any) => {
            const dir = e.currentTarget.getAttribute('aria-label').includes('previous')
              ? 'prev'
              : 'next';

            setOffset(dir === 'next' ? offset + 1 : offset - 1);
          }}
        />
      </TableContainer>
    </>
  );
};
