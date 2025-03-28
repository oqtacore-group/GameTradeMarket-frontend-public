import Link from 'next/link';
import React, { useState } from 'react';
import { Checkbox, Modal } from '@game-trade/ui';
import { Maybe } from '@game-trade/lib/codegen-types';
import * as StyleNFTinfo from '../../style';
import * as Style from './style';

export function Redirection({
  token_url: _TOKEN_URL,
  is_external_item: _IS_EXTERNAL_ITEM,
}: {
  is_external_item: boolean;
  token_url: Maybe<string>;
}) {
  if (typeof window === 'undefined' || !_IS_EXTERNAL_ITEM || !_TOKEN_URL) return <></>;
  const [viewWindow, setViewWindow] = useState(false);

  const showLocalStorage =
    localStorage.getItem('show_again_window_redirect_external_marketplace') !== 'no';

  const [show, setShow] = useState(true);

  const dontShowAgainRedirectExternalMarketplace = () => {
    localStorage.setItem('show_again_window_redirect_external_marketplace', 'no');
  };

  const redirect = () => {
    if (!show) dontShowAgainRedirectExternalMarketplace();
    setViewWindow(false);
  };

  if (!showLocalStorage) {
    return (
      <Link href={{ pathname: _TOKEN_URL }} passHref={true}>
        <a target="_blank" rel="noreferrer">
          <StyleNFTinfo.Button>View original</StyleNFTinfo.Button>
        </a>
      </Link>
    );
  }
  return (
    <>
      <StyleNFTinfo.Button onClick={() => setViewWindow(true)}>View original</StyleNFTinfo.Button>
      {viewWindow && (
        <Modal onClose={() => setViewWindow(false)} hasHeader={false} isPadding={false} size={300}>
          <Style.ModalContent>
            <Style.Header>redirecting</Style.Header>
            <Style.Description>
              This item was added from an external marketplace. Press <b>"Go"</b> to be redirected
              to the the original listing. This link is safe, as we work only with trusted
              marketplaces.
            </Style.Description>
            <Style.Description>
              P.S. If you re-list your items on GameTrade Market after buying them on other
              marketplaces, expect many bonuses in the near future!
            </Style.Description>
            <Style.WrapperCheckbox>
              <Checkbox onClick={() => setShow(!show)} /> <p>Dont't show again</p>
            </Style.WrapperCheckbox>
            {_TOKEN_URL && (
              <Style.WrapperButton>
                <Link href={_TOKEN_URL}>
                  <a target="_blank" rel="noreferrer">
                    <StyleNFTinfo.Button onClick={redirect}>Go</StyleNFTinfo.Button>
                  </a>
                </Link>
              </Style.WrapperButton>
            )}
          </Style.ModalContent>
        </Modal>
      )}
    </>
  );
}
