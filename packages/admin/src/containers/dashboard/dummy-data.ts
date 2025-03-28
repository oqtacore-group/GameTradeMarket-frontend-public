const createData = (
  value: string,
  allTime: number,
  last24hours: number,
  last30days: number,
  onlyFirstTime24hours: number | string
) => {
  return { value, allTime, last24hours, last30days, onlyFirstTime24hours };
};

export const rows = [
  createData('Users', 8880, 0, 0, '-'),
  createData('Listings', 162, 31, 100, 10),
  // createData('Sales number', 50, 3, 9, '5 (3 first sales, 2 first buys)'),
  // createData('Sales total, $', $26348.71, $500,00, $2500.00, '-'),
];
