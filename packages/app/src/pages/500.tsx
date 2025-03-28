import React, { useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { sendReportError } from '@game-trade/lib';

const Custom500Page: NextPage = () => <Custom500 />;

function Custom500() {
  useEffect(() => {
    const send = async () => {
      await sendReportError(window.location.pathname, '500');
    };

    send();
  }, []);
  return (
    <div style={{ textAlign: 'center', marginTop: '15rem' }}>
      <h2>Sorry, we just encountered</h2>
      <h2>500 Internal Server Errors</h2>
      <h2>Oh no, it's just one error, but still...</h2>
      <p>
        <Link href="/">
          <a>Go to home page</a>
        </Link>
      </p>
    </div>
  );
}
export default Custom500Page;
