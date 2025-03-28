import { useState, useEffect } from 'react';
import { usePeopleLazyQuery } from '@game-trade/lib/src/codegen-types';
import { debounce } from 'lodash';

import { UsersContent } from './content';
import { UsersContainerWrapper } from './style';

const DEFAULT_OFFSET = 20;

// export interface IServerSideProps {
//   peopleList: PeopleQuery;
// }
// { serverSideData }: { serverSideData?: IServerSideProps }

export const PeopleContainer = () => {
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(DEFAULT_OFFSET);
  const [getPeople, { data: usersData, loading }] = usePeopleLazyQuery({ fetchPolicy: 'no-cache' });
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const onIncreaseOffset = () => {
    setOffset(offset + DEFAULT_OFFSET);
  };

  useEffect(() => {
    getPeople({
      variables: {
        offset: offset * (page - 1),
        first: offset,
        hide_me: true,
      },
    });
  }, [page, offset]);

  useEffect(() => {
    if (!loading) {
      setUsers(usersData?.users?.edges?.node as any);
      setTotal(usersData?.users?.totalCount as any);
    }
  }, [usersData, loading]);

  const onChangeFindInput = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);

    const variables: any = {
      offset: offset * (page - 1),
      first: offset,
      hide_me: true,
    };

    if (e.target.value) variables.nick_name = e.target.value;

    getPeople({ variables });
  }, 600);

  return (
    <UsersContainerWrapper>
      <UsersContent
        onChangeFindInput={onChangeFindInput}
        onChangePage={onChangePage}
        onIncreaseOffset={onIncreaseOffset}
        page={page}
        offset={offset}
        total={total}
        users={users}
        setUsers={setUsers}
        loading={loading}
      />
    </UsersContainerWrapper>
  );
};
