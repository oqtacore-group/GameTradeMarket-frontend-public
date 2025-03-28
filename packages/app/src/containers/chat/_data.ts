// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import faker from 'faker/locale/en';

export const generateUser = (index: number) => ({
  id: faker.random.number({ min: 5, max: 100 }),
  title: faker.name.firstName(),
  avatar: faker.image.animals(),
  hasMessages: index <= 5,
  unReadMessages: index <= 5 ? faker.random.number({ min: 1, max: 100 }) : 0,
  lastMessage: faker.address.streetAddress(),
  visit: index <= 5 ? 'online' : 'last seen resently',
});

export const getMessages = (index: number) => ({
  user: generateUsers()[index],
  message: {
    text: faker.name.jobArea(),
    date: faker.date.past(),
  },
});

function generateUsers() {
  // return [...Array(size)].map((value, index, array) => generateUser(index));
  return [
    {
      id: 'de8392de-8839-4f37-8f5c-d299b93af3d6',
      title: 'Alexander red',
      avatar: faker.image.animals(),
      hasMessages: true,
      lastMessage: '2245 Peyton Port',
      unReadMessages: 68,
    },
    {
      id: 'd874a05c-4416-4e37-9eae-126f7989af2f',
      title: 'Nasekin',
      avatar: faker.image.animals(),
      hasMessages: true,
      lastMessage: '2245 Peyton Port',
      unReadMessages: 68,
    },
  ];
}

function generateMessages(size = 20, listUsers: any[], userId: string) {
  const found = listUsers.find((u) => u.id === userId);
  const messageMap = {} as any;
  [...Array(size)].forEach(() => {
    messageMap[faker.date.past() as any] = [...Array(size)].map((value, index) =>
      getMessages(index)
    );
  });
  return {
    user: found,
    messages: found.hasMessages ? messageMap : null,
  };
}

const listUsers = generateUsers();

const getUserMessages = (userId: string) => generateMessages(20, listUsers, userId);

export { listUsers, getUserMessages };
