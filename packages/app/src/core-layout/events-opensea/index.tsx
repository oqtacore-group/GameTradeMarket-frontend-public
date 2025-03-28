import React, { useEffect, useState, useCallback } from 'react';
import { jsonrepair } from 'jsonrepair';

import { WrapperLoader } from './style';
import { initTransactionSocket } from './utils';
import { useMediaQuery } from '@mui/material';
import { Loader, ALIGN, SIZE } from '@game-trade/ui';
import { Event } from './event';

export const EventsOpenseaComponent = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [socket, setSocket] = useState<any>();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [resetTransaction, setResetTransaction] = useState<any>();

  useEffect(() => {
    initWSS();
  }, []);

  const initWSS = useCallback(() => {
    initTransactionSocket(setSocket);
  }, []);

  useEffect(() => {
    if (socket && socket?.readyState) {
      socket.onmessage = (message: any) => {
        if (message.data) {
          const repairedData = jsonrepair(message.data);
          const data = JSON.parse(repairedData);
          if (data && typeof data !== 'string' && data.length) {
            const dataFiltered = data?.filter((tx: any) => tx.Event === 'sale');
            if (dataFiltered.length) {
              clearTimeout(resetTransaction);
              setTransactions(dataFiltered);
            }
          }
        }
      };
    }
  }, [socket]);

  useEffect(() => {
    if (transactions.length) {
      const reset = setTimeout(() => {
        setTransactions([]);
      }, 10000);
      setResetTransaction(reset);
    }
  }, [transactions]);

  return (
    <>
      {transactions.length
        ? transactions?.map((transaction, index) => {
            if ((!isMobile && index > 2) || (isMobile && index > 0)) return;
            return <Event key={transaction.Timestamp + Math.random()} transaction={transaction} />;
          })
        : isMobile && (
            <WrapperLoader>
              <Loader position={ALIGN.CENTER} size={SIZE.BIG} />
            </WrapperLoader>
          )}
    </>
  );
};
