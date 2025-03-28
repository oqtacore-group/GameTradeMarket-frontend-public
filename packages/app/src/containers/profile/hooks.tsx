import { useState, useEffect } from 'react';
import { IOptionSelectComponent } from '@game-trade/ui';
import { useUserDataInfoLazyQuery, User } from '@game-trade/lib/src/codegen-types';

import { TabId } from './interface';
import { getGameOptions } from './utils';

export const getUserInfo = (id: string, customUrl = '') => {
  const [activeTabId, setActiveTabId] = useState(TabId.ownedItems);
  const [hasPrice, setHasPrice] = useState<boolean | undefined>(undefined);
  const [searchString, setSearchString] = useState<string | undefined>(undefined);
  const [total, setTotal] = useState(0);
  const [offsetStep, setOffsetStep] = useState(100);
  const [page, setPage] = useState(1);
  const [gamesOptions, setGamesOptions] = useState<IOptionSelectComponent[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | undefined>();
  const [userNick, setUserNick] = useState('');
  // const [isOnline, setOnline] = useState<boolean | undefined | null>(false);
  const [email, setEmail] = useState<string | undefined | null>('');
  const [imageUrl, setImageUrl] = useState<string | undefined | null>();
  const [friends, setFriends] = useState<User[] | undefined>([]);
  const [friendsCount, setFriendsCount] = useState<any>('');
  const [getUserInfo, { loading, data }] = useUserDataInfoLazyQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: id as string,
      userId: (id as string) || customUrl,
      customUrl,
      offset: offsetStep * (page - 1),
      first: offsetStep,
      hasPrice,
    },
  });

  useEffect(() => {
    getUserInfo({
      variables: {
        id: id as string,
        userId: (id as string) || customUrl,
        customUrl: customUrl,
        offset: offsetStep * (page - 1),
        first: offsetStep,
        hasPrice,
        name: searchString,
        game_code: selectedGame,
      },
    });
  }, [searchString, hasPrice, offsetStep, page, id, customUrl, selectedGame]);

  useEffect(() => {
    if (activeTabId === TabId.ownedItems) {
      setHasPrice(undefined);
    }
    if (activeTabId === TabId.forSale) {
      setHasPrice(true);
    }
  }, [activeTabId]);

  useEffect(() => {
    if (data && !loading) {
      const total = user?.inventory?.totalCount || 0;
      const gamesList = user?.games?.edges?.node || [];
      const gamesOptions = getGameOptions(gamesList);
      // const online = user?.online;
      const email = user?.email;
      const imageUrl = user && user?.image_url;
      const friends = user && user?.friends?.edges?.node?.slice(0, 6);
      const friendsCount = user && user?.friends?.totalCount;
      setTotal(total);
      setGamesOptions(gamesOptions);
      // setOnline(online);
      setEmail(email);
      setFriends(friends);
      setFriendsCount(friendsCount);
      setImageUrl(imageUrl);
      setUserNick(data.user?.nick_name || '');

      setTotal(total);
    }

    if (data && !loading && !userNick) {
      const user: User = data?.user as User;
      const nick = user?.nick_name || '';
      setUserNick(nick);
    }
  }, [data, loading]);

  const user: User | undefined = data && (data?.user as User);
  const items = user && user?.inventory?.edges?.node;

  return {
    data,
    imageUrl,
    email,
    nickName: userNick,
    items,
    loading,
    setSelectedGame,
    setActiveTabId,
    setOffsetStep,
    setPage,
    total,
    page,
    offsetStep,
    selectedGame,
    activeTabId,
    setSearchString,
    searchString,
    gamesOptions,
    // isOnline,
    friends,
    friendsCount,
  };
};
