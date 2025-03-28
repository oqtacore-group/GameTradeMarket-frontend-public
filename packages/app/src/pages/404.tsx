import React, { useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { sendReportError } from '@game-trade/lib';

const Custom404Page: NextPage = () => <Custom404 />;

function Custom404() {
  useEffect(() => {
    const send = async () => {
      await sendReportError(window.location.pathname, '404');
    };

    send();
  }, []);
  return (
    <div style={{ textAlign: 'center', marginTop: '15rem' }}>
      <h2>We have 404 reasons not to show you this page</h2>
      <h2>Kidding! We just don't have it &nbsp; ¯\_(ツ)_/¯</h2>
      <p>
        <Link href="/">
          <a>Go to home page</a>
        </Link>
      </p>
    </div>
  );
}
export default Custom404Page;
