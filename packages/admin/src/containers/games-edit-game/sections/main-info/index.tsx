import { useCallback, useState, useEffect } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Grid from '@mui/material/Grid';
import { useGameCardLazyQuery, useUpdateSourceMutation } from '@game-trade/lib/src/codegen-types';

type FieldsKeys = 'owner' | 'publisher' | 'developer' | 'socialLinks' | 'gameIssueDate';

export const MainInfoSection = () => {
  const router = useRouter();
  const { id: gameCode } = router.query;

  const [fields, setFields] = useState<{
    owner: string;
    publisher: string;
    developer: string;
    socialLinks: string[];
    gameIssueDate: string;
  }>({
    owner: '',
    publisher: '',
    developer: '',
    socialLinks: [],
    gameIssueDate: '',
  });

  const [getGameCard, { data: dataGameCard }] = useGameCardLazyQuery({
    fetchPolicy: 'no-cache',
    variables: {
      code: gameCode as string,
    },
  });

  useEffect(() => {
    if (!gameCode) return;
    getGameCard();
  }, [gameCode]);

  useEffect(() => {
    setFields({
      owner: dataGameCard?.gameCard?.owners as any,
      publisher: dataGameCard?.gameCard?.publisher as string,
      developer: dataGameCard?.gameCard?.developer as string,
      socialLinks: dataGameCard?.gameCard?.social_links as any,
      gameIssueDate: dataGameCard?.gameCard?.release_date as string,
    });
  }, [dataGameCard]);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;

      if (name === 'socialUrl1') {
        setFields({
          ...fields,
          socialLinks: [value, fields['socialLinks'][1]],
        });
      } else if (name === 'socialUrl2') {
        setFields({
          ...fields,
          socialLinks: [fields['socialLinks'][0], value],
        });
      } else {
        setFields({
          ...fields,
          [name]: value,
        });
      }
    },
    [fields]
  );

  const handleChangeGameIssueDate = useCallback(
    (value: any) => {
      setFields({
        ...fields,
        gameIssueDate: moment(value).toISOString().split('T')[0],
      });
    },
    [fields]
  );

  const isBtnDisabled = useCallback(
    (fieldName: string) => {
      if (!dataGameCard?.gameCard) return true;

      const info = dataGameCard?.gameCard as { [k: string]: any };

      switch (fieldName) {
        case 'owner':
          if (fields['owner'] === info['owner_id']) return true;
          break;
        case 'publisher':
          if (fields['publisher'] === info['publisher']) return true;
          break;
        case 'developer':
          if (fields['developer'] === info['developer']) return true;
          break;
        case 'socialUrl1':
          if (fields['socialLinks'][0] === info['social_links'][0]) return true;
          break;
        case 'socialUrl2':
          if (fields['socialLinks'][1] === info['social_links'][1]) return true;
          break;
        case 'gameIssueDate':
          if (fields['gameIssueDate'] === info['release_date']) return true;
          break;
      }

      return false;
    },
    [fields, dataGameCard]
  );

  // Update source

  const [updateSource] = useUpdateSourceMutation();

  const handleUpdateSource = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      const variables: any = {
        code: gameCode as string,
      };

      const dataName = e.currentTarget.dataset.name! as any;

      // Gam issue date
      if (dataName === 'gameIssueDate') {
        variables.release_date = fields.gameIssueDate;

        // Social URL 1
      } else if (dataName === 'socialUrl1') {
        variables.social_links = [];

        variables.social_links[0] = fields.socialLinks[0];

        if (!fields.socialLinks[1]) {
          variables.social_links[1] = '';
        } else {
          variables.social_links[1] = fields.socialLinks[1];
        }

        // Social URL 2
      } else if (dataName === 'socialUrl2') {
        variables.social_links = [];

        if (!fields.socialLinks[0]) {
          variables.social_links[0] = '';
        } else {
          variables.social_links[0] = fields.socialLinks[0];
        }

        variables.social_links[1] = fields.socialLinks[1];

        // Other fields
      } else {
        variables[dataName] = fields[dataName as FieldsKeys];
      }

      await updateSource({ variables });

      await getGameCard();
    },
    [gameCode, fields]
  );

  if (!dataGameCard || !fields['socialLinks']) return null;

  return (
    <>
      <h2>Main info</h2>

      {/* Owner user */}
      <Grid container={true} spacing={3} alignItems="center">
        <Grid item={true}>
          <FormControl>
            <TextField
              sx={{ width: '30ch' }}
              value={fields['owner']}
              name="owner"
              onChange={handleChangeInput}
              label="Owner user ID"
            />
          </FormControl>
        </Grid>

        <Grid item={true}>
          <FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={isBtnDisabled('owner')}
              onClick={handleUpdateSource}
              data-name="owner">
              Save
            </Button>
          </FormControl>
        </Grid>
      </Grid>

      <br />
      <br />

      {/* Publisher */}
      <Grid container={true} spacing={3} alignItems="center">
        <Grid item={true}>
          <FormControl>
            <TextField
              sx={{ width: '30ch' }}
              value={fields['publisher']}
              name="publisher"
              onChange={handleChangeInput}
              label="Publisher"
            />
          </FormControl>
        </Grid>

        <Grid item={true}>
          <FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={isBtnDisabled('publisher')}
              onClick={handleUpdateSource}
              data-name="publisher">
              Save
            </Button>
          </FormControl>
        </Grid>
      </Grid>

      <br />
      <br />

      {/* Developer */}
      <Grid container={true} spacing={3} alignItems="center">
        <Grid item={true}>
          <FormControl>
            <TextField
              sx={{ width: '30ch' }}
              value={fields['developer']}
              name="developer"
              onChange={handleChangeInput}
              label="Developer"
            />
          </FormControl>
        </Grid>

        <Grid item={true}>
          <FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={isBtnDisabled('developer')}
              onClick={handleUpdateSource}
              data-name="developer">
              Save
            </Button>
          </FormControl>
        </Grid>
      </Grid>

      <br />
      <br />

      {/* Social media #1 */}
      <Grid container={true} spacing={3} alignItems="center">
        <Grid item={true}>
          <FormControl>
            <TextField
              sx={{ width: '30ch' }}
              value={fields['socialLinks'] ? fields['socialLinks'][0] : undefined}
              name="socialUrl1"
              onChange={handleChangeInput}
              label="Social media #1"
            />
          </FormControl>
        </Grid>

        <Grid item={true}>
          <FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={isBtnDisabled('socialUrl1')}
              onClick={handleUpdateSource}
              data-name="socialUrl1">
              Save
            </Button>
          </FormControl>
        </Grid>
      </Grid>

      <br />
      <br />

      {/* Social media #2 */}
      <Grid container={true} spacing={3} alignItems="center">
        <Grid item={true}>
          <FormControl>
            <TextField
              sx={{ width: '30ch' }}
              value={fields['socialLinks'] ? fields['socialLinks'][1] : undefined}
              name="socialUrl2"
              onChange={handleChangeInput}
              label="Social media #2"
            />
          </FormControl>
        </Grid>

        <Grid item={true}>
          <FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={isBtnDisabled('socialUrl2')}
              onClick={handleUpdateSource}
              data-name="socialUrl2">
              Save
            </Button>
          </FormControl>
        </Grid>
      </Grid>

      <br />
      <br />

      {/* Game issue date */}
      <Grid container={true} spacing={3} alignItems="center">
        <Grid item={true}>
          <FormControl sx={{ width: '34ch' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={fields['gameIssueDate']}
                onChange={handleChangeGameIssueDate}
                renderInput={(params) => <TextField {...params} />}
                label="Game issue date"
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item={true}>
          <FormControl>
            <Button
              variant="contained"
              size="large"
              disabled={isBtnDisabled('gameIssueDate')}
              onClick={handleUpdateSource}
              data-name="gameIssueDate">
              Save
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
