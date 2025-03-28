import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import { useGetTokenToImpersonateMutation } from '@game-trade/lib/src/codegen-types';

export const ManagementImpersonationContainer = () => {
  //
  // Input fields
  //

  const [fields, setFields] = useState({
    email: '',
    userId: '',
  });

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields({
        ...fields,
        [e.target.name]: e.target.value,
      });
    },
    [fields]
  );

  //
  // Impersonate
  //

  const [getTokenToImpersonateMutation] = useGetTokenToImpersonateMutation({
    fetchPolicy: 'no-cache',
  });

  const handleImpersonate = useCallback(async () => {
    const { data } = await getTokenToImpersonateMutation({
      variables: {
        email: fields['email'] || null,
        id: fields['userId'] || null,
      },
    });

    const siteUrl = location.href.includes('gametrade.market')
      ? location.origin.replace('admin.', '')
      : 'http://localhost:3001';

    window.open(
      siteUrl +
        '?impersonationTokenType=' +
        data?.access.token_type +
        '&impersonationToken=' +
        data?.access.token
    );
  }, [fields]);

  return (
    <>
      <h1>Impersonation</h1>

      <Box
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate={true}
        autoComplete="off">
        <FormControl>
          <TextField label="Email" variant="outlined" onChange={handleChangeInput} name="email" />
        </FormControl>

        <span>OR</span>

        <FormControl>
          <TextField
            label="User ID"
            variant="outlined"
            onChange={handleChangeInput}
            name="userId"
          />
        </FormControl>
      </Box>

      <p>* If both fields filled then email will be use</p>

      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Button
          variant="contained"
          disabled={!(fields['email'] || fields['userId'])}
          size="large"
          onClick={handleImpersonate}>
          Impersonate
        </Button>
      </Box>
    </>
  );
};
