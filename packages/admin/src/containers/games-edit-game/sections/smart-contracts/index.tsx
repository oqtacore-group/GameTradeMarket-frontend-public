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
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import CircularProgress from '@mui/material/CircularProgress';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  useGetContractsLazyQuery,
  useGetBlockchainsListLazyQuery,
  useAddContractMutation,
  useRemoveContractMutation,
} from '@game-trade/lib/src/codegen-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const SmartContractsSection = () => {
  const router = useRouter();
  const { id: gameCode } = router.query;

  //
  // Get smart contracts
  //

  const [getContractsLazyQuery, { data: contracts, loading: contractsLoading }] =
    useGetContractsLazyQuery({
      fetchPolicy: 'no-cache',
      variables: {
        code: gameCode as string,
      },
    });

  useEffect(() => {
    if (gameCode) getContractsLazyQuery();
  }, [gameCode]);

  //
  // Add contract modal
  //

  const [getBlockchainsListLazyQuery, { data: blockchainsList }] = useGetBlockchainsListLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [contractAddressValue, setContractAddressValue] = useState('');
  const handleContractAddressValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setContractAddressValue(e.target.value),
    [setContractAddressValue]
  );

  const [gameNameValue, setGameNameValue] = useState('');
  const handleGameNameValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setGameNameValue(e.target.value),
    [setGameNameValue]
  );

  const [blockchainSelectValue, setBlockchainSelectValue] = useState('');
  const handleBlockchainChange = useCallback(
    (e: SelectChangeEvent<string>) => setBlockchainSelectValue(e.target.value),
    [setBlockchainSelectValue]
  );

  const [isTestChecked, setIsTestChecked] = useState(false);
  const handleIsTestSwitchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setIsTestChecked(e.target.checked),
    []
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    getBlockchainsListLazyQuery();
    setIsModalVisible(true);
  }, [setIsModalVisible]);

  const hideModal = useCallback(() => {
    setContractAddressValue('');
    setGameNameValue('');
    setBlockchainSelectValue('');
    setIsTestChecked(false);
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  //
  // Add contract
  //

  const [addContract] = useAddContractMutation();

  const handleAddContract = useCallback(async () => {
    await addContract({
      variables: {
        source: gameCode as string,
        blockchain: blockchainSelectValue,
        contract: contractAddressValue,
        is_test: isTestChecked,
      },
    });

    getContractsLazyQuery();

    hideModal();
  }, [gameCode, blockchainSelectValue, contractAddressValue, gameNameValue, isTestChecked]);

  //
  // Remove contract
  //

  const [removeContract] = useRemoveContractMutation();

  const handleRemoveContract = useCallback(async (e: React.MouseEvent<HTMLElement>) => {
    console.log('e.currentTarget.dataset', e.currentTarget.dataset);
    await removeContract({
      variables: {
        blockchain: e.currentTarget.dataset.blockchain!,
        contract: e.currentTarget.dataset.contract!,
      },
    });

    getContractsLazyQuery();
  }, []);

  console.log('contracts', contracts);

  return (
    <>
      <h2>Smart contracts</h2>

      <Box
        component="form"
        noValidate={true}
        autoComplete="off"
        sx={{
          '&': { display: 'flex', alignItems: 'center' },
          '> div': { display: 'block', marginRight: '20px' },
        }}>
        <FormControl>
          <Button variant="contained" size="large" onClick={showModal}>
            Add contract
          </Button>
        </FormControl>
      </Box>

      <br />
      <br />

      {contractsLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ backgroundColor: '#25192c' }}>
          <Table sx={{ minWidth: 650, 'th, td': { color: '#fff' } }}>
            <TableHead>
              <TableRow>
                <TableCell>Smart contract</TableCell>
                <TableCell>Game name</TableCell>
                <TableCell>Blockchain</TableCell>
                <TableCell>Is test?</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {contracts?.getContracts?.map((row: any) => (
                <TableRow
                  key={row.contract}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.contract}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.blockchain}</TableCell>
                  <TableCell>{row.is_test ? 'Yes' : 'No'}</TableCell>
                  <TableCell sx={{ '> div': { color: '#fff', textDecoration: 'underline' } }}>
                    <div
                      data-contract={row.contract}
                      onClick={handleRemoveContract}
                      style={{ cursor: 'pointer' }}>
                      Remove
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Modal open={isModalVisible} onClose={hideModal}>
        <Box sx={style}>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate={true}
            autoComplete="off">
            <h2>Add smart contract</h2>

            <FormGroup>
              <InputLabel>Contract address</InputLabel>
              <TextField
                value={contractAddressValue}
                onChange={handleContractAddressValueChange}
                style={{ width: '100%', margin: '0 0 20px' }}
              />
            </FormGroup>

            <FormGroup>
              <InputLabel>Game name</InputLabel>
              <TextField
                value={gameNameValue}
                onChange={handleGameNameValueChange}
                style={{ width: '100%', margin: '0 0 20px' }}
              />
            </FormGroup>

            <FormGroup>
              <InputLabel>Blockchain</InputLabel>
              <Select
                value={blockchainSelectValue}
                onChange={handleBlockchainChange}
                label="Blockchain">
                {blockchainsList?.networks.map((net) => (
                  <MenuItem value={net.code} key={net.code}>
                    {net.name}
                  </MenuItem>
                ))}
              </Select>
            </FormGroup>

            <br />

            <FormGroup>
              <FormControlLabel
                control={<Switch checked={isTestChecked} onChange={handleIsTestSwitchChange} />}
                label="Is test?"
              />
            </FormGroup>

            <br />

            <Button
              variant="contained"
              disabled={!contractAddressValue || !gameNameValue || !blockchainSelectValue}
              onClick={handleAddContract}>
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
