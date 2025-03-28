import React from 'react';
import { ModalHeader, ModalContent, Title, SubTitle } from './style';

export const Error = ({ messageError }: { messageError?: string }) => {
  return (
    <ModalContent padding={true}>
      <ModalHeader padding={true}>
        <Title>
          {messageError ? (
            <>
              Wallet returned internal error <br />
              (not an error from GameTrade Market)
            </>
          ) : (
            'Error'
          )}
        </Title>
        {messageError ? (
          <SubTitle>{messageError}</SubTitle>
        ) : (
          <SubTitle>
            The Mint transaction has not executed correctly or has not even started. Check if you
            have
            <a href={'https://metamask.io/'} target="_blank" rel="noreferrer">
              {' '}
              Metamask browser plugin
            </a>{' '}
            installed and logged in. If you have the Metamask browser plugin installed and logged
            in, the error can happen due to high prices.
          </SubTitle>
        )}
      </ModalHeader>
    </ModalContent>
  );
};
