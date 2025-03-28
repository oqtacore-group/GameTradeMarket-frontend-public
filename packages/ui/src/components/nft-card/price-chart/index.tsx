import React, { useEffect, useRef } from 'react';
// import { default as ChartJs } from 'chart.js/auto';

interface IProps {
  data: any;
}

export const PriceChart = (props: IProps) => {
  // const { data } = props;
  const refCanvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = refCanvas?.current?.getContext('2d');
    const gradientFill = ctx?.createLinearGradient(0, 0, 0, 320);
    gradientFill?.addColorStop(0, '#379FFF');
    gradientFill?.addColorStop(0.4, 'rgb(255 65 179 / 50%)');
    gradientFill?.addColorStop(0.7, 'rgb(255 65 179 / 20%)');
    gradientFill?.addColorStop(1, 'rgb(0,0,0,0)');
    let chartJS: any;
    // if (ctx) {
    //   chartJS = new ChartJs(ctx, {
    //     type: 'line',
    //     data: {
    //       labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    //       datasets: [
    //         {
    //           fill: true,
    //           borderColor: function (context) {
    //             const chart = context.chart;
    //             const { ctx, chartArea } = chart;
    //
    //             if (!chartArea) {
    //               return;
    //             }
    //             let gradient;
    //
    //             if (!gradient) {
    //               gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    //               gradient.addColorStop(0, '#379FFF');
    //               gradient.addColorStop(0.5, '#FF41B3');
    //               gradient.addColorStop(1, '#379FFF');
    //             }
    //
    //             return gradient;
    //           },
    //           borderWidth: 1,
    //           pointBackgroundColor: 'transparent',
    //           backgroundColor: gradientFill,
    //           data: [10, 48, 0, 50, 67, 55],
    //           pointBorderColor: 'transparent',
    //           pointRadius: 2,
    //           pointHoverRadius: 5,
    //           pointHoverBackgroundColor: 'transparent',
    //           pointHoverBorderColor: 'white',
    //         },
    //       ],
    //     },
    //     options: {
    //       responsive: true,
    //       maintainAspectRatio: false,
    //       layout: {
    //         autoPadding: false,
    //         padding: {
    //           top: 23,
    //         },
    //       },
    //       plugins: {
    //         legend: {
    //           display: false,
    //         },
    //         tooltip: {
    //           padding: 10,
    //           displayColors: false,
    //           titleFont: {
    //             weight: '300',
    //             size: 8,
    //           },
    //           titleSpacing: 0,
    //           titleMarginBottom: 0,
    //           callbacks: {
    //             title: function (ctx) {
    //               return ctx[0].label;
    //             },
    //             label: function (ctx) {
    //               return '$' + ctx.raw;
    //             },
    //           },
    //           intersect: false,
    //           backgroundColor: '#383a3e',
    //         },
    //       },
    //       scales: {
    //         x: {
    //           grid: {
    //             borderWidth: 0,
    //             borderColor: 'transparent',
    //             display: false,
    //           },
    //           ticks: {
    //             font: {
    //               size: 12,
    //             },
    //             align: 'center',
    //             padding: 20,
    //             color: '#A073A7',
    //           },
    //         },
    //         y: {
    //           grid: {
    //             borderWidth: 0,
    //             borderColor: 'transparent',
    //             tickColor: 'transparent',
    //             color: 'black',
    //           },
    //           ticks: {
    //             font: {
    //               size: 13,
    //             },
    //             callback: function (value) {
    //               return '$' + value;
    //             },
    //             color: 'white',
    //           },
    //         },
    //       },
    //     },
    //   });
    // }

    return () => {
      chartJS.destroy();
    };
  }, [refCanvas]);
  return (
    <div
      style={{
        height: '41rem',
      }}>
      <canvas ref={refCanvas} />
    </div>
  );
};
