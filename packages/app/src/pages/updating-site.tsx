import React from 'react';
import { NextPage } from 'next';
import { SocialLinks } from '../core-layout/social-links';

const UpdatingSitePage: NextPage = () => <UpdatingSite />;

function UpdatingSite() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% 0' }}>
      <h2>We are updating the site.</h2>
      <h2>Come a little later, you will find a lot of interesting things</h2>
      <SocialLinks />
    </div>
  );
}
export default UpdatingSitePage;
