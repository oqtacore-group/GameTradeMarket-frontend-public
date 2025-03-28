import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { SvgChevronDown } from '@game-trade/icons';
import { ALIGN, Loader, SIZE } from '../../index';

import {
  TabsWrapper,
  Tab,
  TabCounter,
  LoaderBox,
  SelectWrapper,
  SelectPopup,
  SelectOption,
  SelectValue,
  SelectIconWrapper,
} from './style';
import Portal from './portal';
import { useTranslation } from '@game-trade/lib/services/i18n/index.js';

export interface IPropsTabs {
  tabs: ITab[];
  activeTabId: string;
  onChange: (activeId: any) => void;
  isLoading?: boolean;
  total?: number;
}

export interface ITab {
  id: any;
  label: string;
  count?: string;
  isDisabled?: boolean;
}

export interface IOpenerPositionTabs {
  x: number;
  y: number;
  left: number;
  top: number;
  width: number;
  height: number;
}

export const Tabs = ({ tabs, activeTabId, onChange, total, isLoading }: IPropsTabs) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'translation' });
  const isSlim = useMediaQuery('(max-width:768px)');

  const onChangeTab = (tabId: any, isDisabled?: boolean) => () => {
    if (isDisabled) {
      return undefined;
    }
    onChange(tabId);
  };

  return isSlim ? (
    <TabsSelect
      tabs={tabs}
      activeTabId={activeTabId}
      onChange={onChange}
      total={total}
      isLoading={isLoading}
    />
  ) : (
    <TabsWrapper>
      {tabs.map(({ id, label, count, isDisabled }) => (
        <Tab
          onClick={onChangeTab(id, isDisabled)}
          key={id}
          isActive={id === activeTabId}
          isDisabled={isDisabled}>
          {t(label)}
          {id === activeTabId && !isLoading && !isNaN(total as number) ? (
            <TabCounter>{total}</TabCounter>
          ) : (
            ''
          )}
          {id === activeTabId && isLoading ? (
            <LoaderBox>
              <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
            </LoaderBox>
          ) : (
            ''
          )}
        </Tab>
      ))}
    </TabsWrapper>
  );
};

export const TabsSelect = ({ tabs, activeTabId, onChange, isLoading, total }: IPropsTabs) => {
  const { t } = useTranslation('profilePage', { keyPrefix: 'translation' });
  const [isOpen, setOpen] = useState(false);
  const [targetElement, targetRefCallback] = useState<HTMLElement | null>(null);
  const [openerPosition, setOpenerPosition] = useState<IOpenerPositionTabs | null>(null);
  useEffect(() => {
    if (targetElement && window) {
      const openerMetrics = targetElement.getBoundingClientRect();
      const { scrollX, scrollY } = window;
      setOpenerPosition({
        x: openerMetrics.left,
        y: openerMetrics.top,
        left: openerMetrics.left + scrollX,
        top: openerMetrics.top + scrollY,
        width: openerMetrics.width,
        height: openerMetrics.height,
      });
    }

    if (!isOpen) {
      resetPosition();
    }
  }, [isOpen]);

  // click on document
  const clickHandler = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen && window) {
      document.body.addEventListener('click', clickHandler);
    }
    return () => {
      document.body.removeEventListener('click', clickHandler);
    };
  }, [isOpen, targetElement]);

  const resetPosition = () => {
    setOpenerPosition(null);
  };

  const onChangeTab = (tabId: any, isDisabled?: boolean) => () => {
    if (isDisabled) {
      return;
    }
    onChange(tabId);
    setOpen(false);
  };

  const toggleSelect = () => {
    setOpen(!isOpen);
  };

  const activeTab = tabs.find(({ id }) => id === activeTabId);

  return (
    <SelectWrapper>
      <SelectValue ref={targetRefCallback} onClick={toggleSelect}>
        {t(activeTab?.label || 'Items')}
        {!isLoading && total ? <TabCounter>{total}</TabCounter> : ''}
        {isLoading ? (
          <LoaderBox>
            <Loader size={SIZE.MICRO} position={ALIGN.CENTER} />
          </LoaderBox>
        ) : (
          ''
        )}
        <SelectIconWrapper isOpen={isOpen}>
          <SvgChevronDown />
        </SelectIconWrapper>
      </SelectValue>
      <Portal>
        {isOpen && (
          <SelectPopup isOpen={isOpen} {...openerPosition}>
            {tabs.map(({ id, label, count, isDisabled }) => (
              <SelectOption
                onClick={onChangeTab(id, isDisabled)}
                key={id}
                isActive={id === activeTabId}
                isDisabled={isDisabled}>
                {t(label)}
                {id === activeTabId && count ? <TabCounter>{count}</TabCounter> : ''}
              </SelectOption>
            ))}
          </SelectPopup>
        )}
      </Portal>
    </SelectWrapper>
  );
};
