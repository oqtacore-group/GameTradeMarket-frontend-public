import { useCallback, SetStateAction, Dispatch, useEffect } from 'react';
import { Grid, GridColumn, PaginationNew, UserCard } from '@game-trade/ui';
import {
  useSendFriendRequestMutation,
  useCancelOutgoingFriendRequestMutation,
  useIsFriendRequestSentToMeLazyQuery,
  useApproveFriendRequestMutation,
} from '@game-trade/lib/src/codegen-types';
import { SvgMagnifier } from '@game-trade/icons';

import { TitleUsers } from './title-users';
import { FindUsers } from './find-users';
import {
  UsersContentWrapper,
  UsersContentStyled,
  GridWrapper,
  DesktopTitleWrapper,
  SearchUserWrapper,
  SearchUserInput,
} from './style';

import { SelectedFilters } from '@game-trade/ui/components/filters-tokens-items';
import { breakPointsGridView } from '@/containers/marketplace/utils';
import { useTranslation } from 'next-i18next';

interface IProps {
  onChangePage(page: number): any;
  onIncreaseOffset(): any;
  onChangeFindInput(e: React.ChangeEvent<HTMLInputElement>): void;
  setUsers: Dispatch<SetStateAction<any[]>>;
  page: number;
  offset: number;
  users?: any[] | null;
  total?: number;
  loading?: boolean;
}

export const UsersContent = (props: IProps) => {
  const { t } = useTranslation('peoplePage', { keyPrefix: 'translation' });
  const {
    onChangePage,
    onIncreaseOffset,
    onChangeFindInput,
    setUsers,
    page,
    offset,
    users,
    total,
    loading,
  } = props;

  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [isFriendRequestSentToMe, { data: isSentToMe }] = useIsFriendRequestSentToMeLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [approveFriendRequest] = useApproveFriendRequestMutation({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!isSentToMe) return;

    if (isSentToMe.isFriendRequestSentToMe.isFriendRequestSentToMe) {
      approveFriendRequest({
        variables: {
          friend: isSentToMe.isFriendRequestSentToMe.friend,
        },
      });

      setUsers(
        users!.map((u) => {
          if (u.id === isSentToMe.isFriendRequestSentToMe.friend) {
            return { ...u, is_friendship_requested: false, is_friend: true };
          }

          return u;
        })
      );
    }
  }, [isSentToMe]);

  const handleSendFriendRequest = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      const targetUserId = e.currentTarget.dataset.userId!;

      isFriendRequestSentToMe({
        variables: {
          friend: targetUserId,
        },
      });

      setUsers(
        users!.map((u) => {
          if (u.id === targetUserId) {
            return { ...u, is_friendship_requested: true };
          }

          return u;
        })
      );

      await sendFriendRequest({
        variables: {
          recipient: targetUserId,
        },
      });
    },
    [users, setUsers]
  );

  const [cancelOutgoingFriendRequest] = useCancelOutgoingFriendRequestMutation({
    fetchPolicy: 'no-cache',
  });

  const handleCancelFriendshipRequest = useCallback(
    async (e: React.MouseEvent<HTMLElement>) => {
      const targetUserId = e.currentTarget.dataset.senderId!;

      setUsers(
        users!.map((u) => {
          if (u.id === targetUserId) {
            return { ...u, is_friendship_requested: false };
          }

          return u;
        })
      );

      await cancelOutgoingFriendRequest({
        variables: {
          sender: targetUserId,
        },
      });
    },
    [users, setUsers]
  );

  const breakPoints = breakPointsGridView(true);

  return (
    <UsersContentWrapper>
      <FindUsers>
        <DesktopTitleWrapper>
          <TitleUsers usersCount={total} />
        </DesktopTitleWrapper>

        <SearchUserWrapper>
          <SearchUserInput placeholder={t('filterPeople') || ''} onChange={onChangeFindInput} />

          <SvgMagnifier size={16} />
        </SearchUserWrapper>
      </FindUsers>

      <UsersContentStyled>
        <SelectedFilters />

        <GridWrapper>
          <Grid size={8} breakPoints={breakPoints}>
            {users?.map((u: any) => (
              <GridColumn key={u.id} size={1}>
                <UserCard
                  userCard={u}
                  handleSendFriendRequest={handleSendFriendRequest}
                  handleCancelFriendshipRequest={handleCancelFriendshipRequest}
                />
              </GridColumn>
            ))}
          </Grid>
        </GridWrapper>
      </UsersContentStyled>

      <PaginationNew
        offsetStep={offset}
        total={total || 0}
        page={page}
        onPageChange={onChangePage}
        onClickButton={onIncreaseOffset}
        showButton={true}
        isLoading={loading}
      />
    </UsersContentWrapper>
  );
};
