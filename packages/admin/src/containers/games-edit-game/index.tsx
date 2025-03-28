import Image from 'next/image';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';

import { dummyMultimedia } from './dummy-multimedia';
import { PublisherUsersSection } from './sections/publisher-users';
import { SmartContractsSection } from './sections/smart-contracts';
import { MainInfoSection } from './sections/main-info';

export const EditGameContainer = () => {
  return (
    <>
      <h1>Edit Game</h1>

      <h2>Multimedia</h2>

      <Grid container={true} justifyContent="center" spacing={4}>
        {dummyMultimedia.map((src) => (
          <Grid item={true} key={src + Math.random()}>
            <Card>
              <CardContent>
                <Image src={src} key={src} alt="" width="300" height="169" />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <br />
      <br />

      <PublisherUsersSection />

      <br />
      <br />

      <SmartContractsSection />

      <br />
      <br />

      <MainInfoSection />

      <br />
      <br />
    </>
  );
};
