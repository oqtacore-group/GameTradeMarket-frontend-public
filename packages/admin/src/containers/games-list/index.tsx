import { useState, useEffect } from 'react';
import Link from 'next/link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';

import { useGamesLazyQuery, useGamesCountLazyQuery } from '@game-trade/lib/src/codegen-types';

import { DEFAULT_ROWS_PER_PAGE, AVAILABLE_ROWS_PER_PAGE } from '../../consts';

export const GamesContainer = () => {
  const [offset, setOffset] = useState<number>(0);
  const [first, setFirst] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const [fetchGames, { data: games, loading: gamesLoading }] = useGamesLazyQuery({
    fetchPolicy: 'no-cache',
  });
  const [fetchGamesCount, { data: gamesCount }] = useGamesCountLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    fetchGamesCount();
    fetchGames({ variables: { offset: offset * first, first } });
  }, [offset, first, fetchGames, fetchGamesCount]);

  // const { data: games, loading: gamesLoading } = useGamesQuery();

  if (gamesLoading) return <CircularProgress />;

  return (
    <>
      <h1>Games</h1>

      {games && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>Game</TableCell>
                <TableCell>Admin email</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Items on sale</TableCell>
                <TableCell>Blockchain</TableCell>
                <TableCell>Smart contracts</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {games.games?.edges.node?.map((g: any) => (
                <TableRow key={g.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{g.name}</TableCell>
                  <TableCell>{g.owner}</TableCell>
                  <TableCell>{g.itemCount}</TableCell>
                  <TableCell>{g.itemOnSaleCount}</TableCell>
                  {/*<TableCell>{g.contracts[0].blockchain}</TableCell>*/}

                  <TableCell>
                    {g.contracts.map((c: any) => (
                      <div key={c.contract}>{c.contract}</div>
                    ))}
                  </TableCell>

                  <TableCell
                    sx={{
                      '> a': { color: '#fff', textDecoration: 'underline', whiteSpace: 'nowrap' },
                    }}>
                    <Link href={`/games/${g.code}`}>Edit game</Link>

                    <br />

                    <Link href={`/games/${g.code}/items`}>Edit items</Link>
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
            count={gamesCount?.gamesCount?.total || 0}
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
