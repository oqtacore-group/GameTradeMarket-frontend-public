import React from 'react';
import { routes, SnackbarProps } from '@game-trade/lib';
import { AddressSliceComponent } from '@game-trade/ui';
import Link from 'next/link';
import { i18next } from '@game-trade/lib/services/i18n';

export enum EnumSnackBar {
  metamask_not_installed,
  phantom_not_installed,
  auto_connect_metamask,
  login,
  cancel_network_change,
  network_change,
  add_wallet,
  add_new_wallet,
  switch_wallet,
  purchase_success,
  completed_approved,
  canceled_approved,
  set_the_price_success,
}

export function getSnackBarMessage(_key: EnumSnackBar, ...args: any): SnackbarProps {
  switch (_key) {
    case EnumSnackBar.metamask_not_installed:
      return {
        key: EnumSnackBar.metamask_not_installed,
        children: (
          <div>
            {
              'The Metamask application is not installed. To buy or sell an item, please install Metamask on your device'
            }{' '}
          </div>
        ),
        severity: 'warning',
        duration: 0,
      };
    case EnumSnackBar.phantom_not_installed:
      return {
        key: EnumSnackBar.phantom_not_installed,
        children: (
          <div>
            {
              'GameTrade Market supports all Solana wallets. Please install any wallet extension to your browser and it will be shown as an option in the modal window below'
            }{' '}
          </div>
        ),
        severity: 'warning',
        duration: 0,
      };
    case EnumSnackBar.auto_connect_metamask:
      return {
        key: EnumSnackBar.auto_connect_metamask,
        children: (
          <div>
            {
              'Metamask automatic connection. If Metamask does not open automatically, please open it yourself'
            }
          </div>
        ),
        severity: 'info',
        duration: 0,
      };
    case EnumSnackBar.login:
      return {
        key: EnumSnackBar.login,
        children: (
          <div>
            {/*{args[0].t('sold')}*/}
            {'Please'}{' '}
            <u style={{ cursor: 'pointer' }} onClick={args[0]?.handleOpenLogin}>
              {'login or register'}
            </u>{' '}
            {'to work with the item'}
          </div>
        ),
        severity: 'warning',
        duration: 0,
      };
    case EnumSnackBar.network_change:
      return {
        key: EnumSnackBar.network_change,
        children: `${i18next.t('translation.networkChange', { ns: 'common' })}`,
        severity: 'info',
        duration: 0,
      };
    case EnumSnackBar.cancel_network_change:
      return {
        key: EnumSnackBar.cancel_network_change,
        children: (
          <div>
            {i18next.t('translation.youHave', { ns: 'common' })} {args[0]?.network}{' '}
            {i18next.t('translation.networkId', { ns: 'common' })} {args[0]?.nftChainId + ' }'}
          </div>
        ),
        severity: 'warning',
        duration: 0,
      };
    case EnumSnackBar.completed_approved:
      return {
        key: EnumSnackBar.completed_approved,
        children: <div>{i18next.t('translation.approvedTheToken', { ns: 'common' })}</div>,
        severity: 'success',
        duration: 12000,
      };
    case EnumSnackBar.canceled_approved:
      return {
        key: EnumSnackBar.canceled_approved,
        children: `${i18next.t('translation.itemIsNotApproved2', { ns: 'common' })}`,
        severity: 'error',
        duration: 0,
      };
    case EnumSnackBar.set_the_price_success:
      return {
        key: EnumSnackBar.set_the_price_success,
        children: (
          <div>
            {i18next.t('translation.bidding', { ns: 'common' })}{' '}
            <u onClick={args[0]?.refreshItem} style={{ cursor: 'pointer' }}>
              {i18next.t('translation.refresh', { ns: 'common' })}
            </u>
          </div>
        ),
        severity: 'success',
        duration: 12000,
      };
    case EnumSnackBar.purchase_success:
      return {
        key: EnumSnackBar.purchase_success,
        children: (
          <div>
            {i18next.t('translation.purchase', { ns: 'common' })}{' '}
            <u style={{ cursor: 'pointer' }} onClick={args[0]?.refreshItem}>
              {i18next.t('translation.refresh', { ns: 'common' })}
            </u>{' '}
            {i18next.t('translation.button', { ns: 'common' })}
          </div>
        ),
        severity: 'success',
        duration: 0,
      };
    case EnumSnackBar.switch_wallet:
      return {
        key: EnumSnackBar.switch_wallet,
        children: <div>{i18next.t('translation.changeWallet', { ns: 'common' })}</div>,
        severity: 'info',
        duration: 0,
      };
    case EnumSnackBar.add_wallet:
      return {
        key: EnumSnackBar.add_wallet,
        children: (
          <div>
            {i18next.t('translation.addWallet', { ns: 'common' })}{' '}
            <u>
              <Link href={{ pathname: routes.account, query: 'screen=wallets' }} passHref={true}>
                <a target="_blank" rel="noreferrer">
                  {i18next.t('translation.myAccount', { ns: 'common' })}
                </a>
              </Link>
            </u>
            {i18next.t('translation.afterAddingWallet', { ns: 'common' })}
          </div>
        ),
        severity: 'info',
        duration: 0,
      };
    case EnumSnackBar.add_new_wallet:
      return {
        key: EnumSnackBar.add_new_wallet,
        children: (
          <div>
            {i18next.t('translation.thisWallet', { ns: 'common' })}{' '}
            <b>
              <AddressSliceComponent
                copy={false}
                address={args[0]?.activeAddressMetamask?.toLowerCase()}
              />
            </b>
            {'. '}
            {i18next.t('translation.addNewWallet', { ns: 'common' })}{' '}
            <u>
              <Link href={{ pathname: routes.account, query: 'screen=wallets' }} passHref={true}>
                <a target="_blank" rel="noreferrer">
                  {i18next.t('translation.myAccount', { ns: 'common' })}
                </a>
              </Link>
            </u>{' '}
            {i18next.t('translation.page', { ns: 'common' })}
          </div>
        ),
        severity: 'info',
        duration: 0,
      };
    default:
      return {
        key: 'unknown_error',
        children: <div>{i18next.t('translation.sorry', { ns: 'common' })}</div>,
        severity: 'warning',
        duration: 0,
      };
  }
}
