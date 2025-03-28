import React from 'react';

import { Grid, GridColumn } from './index';

function GridExample() {
  /**
   * gaps between ROWS 32px
   * gaps between COLUMNS 24px
   */
  return (
    <Grid
      // alignItems="end" columns will be aligned to the right
      gap={24}
      verticalGap={32}
      // staticSize={6} if passed, then the sizes for different breakPoints will NOT be recalculated
      breakPoints={{
        // all values passed here are set by default
        // you can pass them through the ThemeProvider theme: { gridBreakPoints: {...} }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '320px': 4, // 4 columns at a screen width of 320 and less
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '530px': 6, // 6 columns at a screen width of 530 and less
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '950px': 8, // 8 columns at a screen width of 950 and less
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '1024px': 10, // 10 columns at a screen width of 1024 and less
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        '1280px': 12, // 12 columns at a screen width of 1280 and less
      }}>
      <GridColumn size={2}>
        <div style={{ minHeight: '150px', background: 'rgba(200, 0, 0, 0.2)' }}>
          this column size=2
        </div>
      </GridColumn>
      <GridColumn size={4}>
        <div style={{ minHeight: '150px', background: 'rgba(200, 0, 0, 0.2)' }}>
          this column size=4
        </div>
      </GridColumn>
      <GridColumn size={6}>
        <div style={{ minHeight: '150px', background: 'rgba(200, 0, 0, 0.2)' }}>
          this column size=6
        </div>
      </GridColumn>
      <GridColumn size={8}>
        <div style={{ minHeight: '150px', background: 'rgba(200, 0, 0, 0.2)' }}>
          this column size=8
        </div>
      </GridColumn>
      <GridColumn size={10}>
        <div style={{ minHeight: '150px', background: 'rgba(200, 0, 0, 0.2)' }}>
          this column size=10
        </div>
      </GridColumn>
      <GridColumn size={12}>
        <div style={{ minHeight: '150px', background: 'rgba(200, 0, 0, 0.2)' }}>
          this column size=12
        </div>
      </GridColumn>
    </Grid>
  );
}

export default function Example() {
  return (
    <div style={{ marginTop: '100px' }}>
      <GridExample />
    </div>
  );
}
