import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import {
  useItemsByGameCodeLazyQuery,
  useItemsByGameCodeCountLazyQuery,
} from '@game-trade/lib/src/codegen-types';

import { DEFAULT_ROWS_PER_PAGE, AVAILABLE_ROWS_PER_PAGE } from '../../consts';

export const EditGameItemsContainer = () => {
  const router = useRouter();
  const { id: gameCode } = router.query;

  const [offset, setOffset] = useState<number>(0);
  const [first, setFirst] = useState<number>(DEFAULT_ROWS_PER_PAGE);

  const [fetchItems, { data: items, loading: itemsLoading }] = useItemsByGameCodeLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [fetchItemsCount, { data: itemsCount }] = useItemsByGameCodeCountLazyQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    fetchItemsCount({
      variables: {
        gameCode: gameCode as string,
      },
    });

    fetchItems({
      variables: {
        gameCode: gameCode as string,
        offset: offset * first,
        first,
      },
    });
  }, [offset, first, gameCode, fetchItems, fetchItemsCount]);

  // const { data: items, loading: itemsLoading } = useItemsByGameCodeQuery({
  //   variables: {
  //     gameCode: gameCode as string,
  //   },
  // });

  // const [isItemVisible, setIsItemVisible] = useState(true);

  // const handleVisibilityClick = useCallback(() => setIsItemVisible(!isItemVisible), [isItemVisible]);

  if (itemsLoading) return <CircularProgress />;

  return (
    <>
      <h1>Edit game items</h1>

      {items && (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Smart contract</TableCell>
                <TableCell>Description</TableCell>
                {/* <TableCell>Actions</TableCell> */}
              </TableRow>
            </TableHead>

            <TableBody>
              {items.gameItemsAdmin?.map((item: any) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.contract}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  {/* <TableCell sx={{ '> *': { cursor: 'pointer' } }}>
                    <div onClick={handleVisibilityClick}>
                      {isItemVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </div>
                  </TableCell> */}
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
            count={itemsCount?.gameItemsCount?.total || 0}
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
