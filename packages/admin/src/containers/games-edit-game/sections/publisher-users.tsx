import { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import {
  usePublisherUsersLazyQuery,
  useAddPublisherUserMutation,
  useRemovePublisherUserMutation,
} from '@game-trade/lib/src/codegen-types';

export const PublisherUsersSection = () => {
  const router = useRouter();
  const { id: gameCode } = router.query;

  //
  // Get publisher users
  //

  const [getPublisherUsersLazyQuery, { data: publisherUsers, loading: publisherUsersLoading }] =
    usePublisherUsersLazyQuery({
      fetchPolicy: 'no-cache',
      variables: {
        code: gameCode as string,
      },
    });

  useEffect(() => {
    if (gameCode) getPublisherUsersLazyQuery();
  }, [gameCode]);

  //
  // Add publisher users
  //

  const [newPublisherEmail, setNewPublisherEmail] = useState<string>('');

  const handleChangeNewPublisherEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPublisherEmail(e.target.value);
  }, []);

  const [addPublisherUserMutation] = useAddPublisherUserMutation({ fetchPolicy: 'no-cache' });

  const handleAddPubisherUser = useCallback(async () => {
    setNewPublisherEmail('');

    await addPublisherUserMutation({
      variables: {
        code: gameCode as string,
        user_email: newPublisherEmail,
      },
    });

    getPublisherUsersLazyQuery();
  }, [newPublisherEmail, gameCode]);

  //
  // Remove publisher user
  //

  const [removePublisherUserMutation] = useRemovePublisherUserMutation({ fetchPolicy: 'no-cache' });

  const handleRemovePublisherUser = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      await removePublisherUserMutation({
        variables: {
          code: gameCode as string,
          user_id: e.currentTarget.dataset.userIdToRevoke!,
        },
      });

      getPublisherUsersLazyQuery();
    },
    [gameCode]
  );

  return (
    <>
      <h2>Publisher users</h2>

      <Box
        component="form"
        noValidate={true}
        autoComplete="off"
        sx={{
          '&': { display: 'flex', alignItems: 'center' },
          '> div': { display: 'block', marginRight: '20px' },
        }}>
        <FormControl>
          <OutlinedInput
            placeholder="Email"
            type="email"
            sx={{ width: '30ch' }}
            value={newPublisherEmail}
            onChange={handleChangeNewPublisherEmail}
          />
        </FormControl>

        <FormControl>
          <Button
            variant="contained"
            size="large"
            onClick={handleAddPubisherUser}
            disabled={!newPublisherEmail}>
            Add publisher user
          </Button>
        </FormControl>
      </Box>

      <br />
      <br />

      {publisherUsersLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {publisherUsers?.publisherUsers?.map((row) => (
                <TableRow
                  key={row.email}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell sx={{ '> div': { color: '#fff', textDecoration: 'underline' } }}>
                    <div
                      data-user-id-to-revoke={row.user_id}
                      style={{ cursor: 'pointer' }}
                      onClick={handleRemovePublisherUser}>
                      Remove
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
