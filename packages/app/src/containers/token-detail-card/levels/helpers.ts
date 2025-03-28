// todo: wait for the backend to provide the necessary fields in the levels parameter
export const setDonuts = (data: any, cols: any) => {
  let numberOfColumns = 4;

  if (cols.col3) numberOfColumns = 3;
  if (cols.col2) numberOfColumns = 2;
  if (cols.col1) numberOfColumns = 1;

  const columns: any[] = [];
  let position = 0;

  data?.map((item: any, index: number) => {
    if (index % numberOfColumns === 0) position = 0;
    if (!columns[position]) columns[position] = [];
    columns[position].push(item);
    position++;
  });

  return columns;
};
