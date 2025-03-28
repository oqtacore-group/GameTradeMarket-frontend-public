// import { getCLS, getFID, getFCP, getLCP, getTTFB, getINP } from 'web-vitals';

// export const sendReportWebVitals = () => {
//   if (process.env.NEXT_PUBLIC_PATHNAME_PREFIX === 'qa.') return;
//   getINP(async (metric) => {
//     await sendMetric(
//       window.location.pathname,
//       'Interaction to Next Paint',
//       metric.id,
//       metric.rating
//     );
//   });
//   getCLS(async (metric) => {
//     await sendMetric(window.location.pathname, 'Cumulative Layout Shift', metric.id, metric.rating);
//   });
//   getFID(async (metric) => {
//     await sendMetric(window.location.pathname, 'First Input Delay', metric.id, metric.rating);
//   });
//   getFCP(async (metric) => {
//     await sendMetric(window.location.pathname, 'First Contentful Paint', metric.id, metric.rating);
//   });
//   getLCP(async (metric) => {
//     await sendMetric(
//       window.location.pathname,
//       'Largest Contentful Paint',
//       metric.id,
//       metric.rating
//     );
//   });
//   getTTFB(async (metric) => {
//     await sendMetric(window.location.pathname, 'Time to First Byte', metric.id, metric.rating);
//   });
// };

// async function sendMetric(locationURL: string, metric: string, id: string, rating: string) {
//   if (process.env.NEXT_PUBLIC_PATHNAME_PREFIX === 'qa.') return;
//   return new Promise(() => {
//     const text =
//       `Page = ${locationURL};\nUseful metrics = ${metric};\nrating = ${rating};\nid = ${id}\ntime zone = ${
//         new Date().toString().split('(')[1].split(')')[0]
//       }`
//         .replace(/ /g, '%20')
//         .split('\n')
//         .join('%0A');
//     const url = `https://api.telegram.org/bot${process.env.REPORT_BOT_TOKEN}/sendMessage?chat_id=-894204420&text=${text}`;
//     fetch(url, {
//       method: 'POST',
//     });
//   });
// }
