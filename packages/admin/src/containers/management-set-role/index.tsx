import { useState, useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useGetRolesListQuery, useSetRoleMutation } from '@game-trade/lib/src/codegen-types';

export const ManagementSetRoleContainer = () => {
  //
  // Email input
  //

  const [email, setEmail] = useState('');

  const handleChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  //
  // Get roles list
  //

  const { data: rolesRes, loading: rolesLoading } = useGetRolesListQuery();

  const [role, setRole] = useState('');

  const handleChangeRole = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value);
  }, []);

  //
  // Set role for user
  //

  const [setRoleMutation] = useSetRoleMutation({ fetchPolicy: 'no-cache' });

  const handleSetRole = useCallback(() => {
    setRoleMutation({
      variables: {
        email,
        roles: [role],
      },
    });
  }, [email, role]);

  return (
    <>
      <h1>Set role</h1>

      <Box
        component="form"
        noValidate={true}
        autoComplete="off"
        sx={{
          '&': { display: 'flex', flexDirection: 'column' },
          '> div': { display: 'block', marginBottom: '20px' },
        }}>
        <FormControl>
          <OutlinedInput
            placeholder="Email"
            type="email"
            sx={{ width: '30ch' }}
            value={email}
            onChange={handleChangeEmail}
          />
        </FormControl>

        <FormControl>
          <InputLabel id="role-label">Role</InputLabel>

          <Select
            labelId="role-label"
            value={role}
            label="Role"
            placeholder="Role"
            onChange={handleChangeRole}
            sx={{ width: '30ch' }}>
            {!rolesLoading &&
              rolesRes?.roles?.map(({ code, name }) => (
                <MenuItem value={code} key={code}>
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl>
          <Button
            variant="contained"
            onClick={handleSetRole}
            disabled={!email || !role}
            size="large">
            Set role
          </Button>
        </FormControl>
      </Box>
    </>
  );
};
