export async function sendReportError(locationURL: string, error: string) {
  if (process.env.NEXT_PUBLIC_PATHNAME_PREFIX === 'qa.') return;
  return new Promise(() => {
    const text = `Page = ${locationURL};\nError = ${error};\nTime zone = ${
      new Date().toString().split('(')[1].split(')')[0]
    }`
      .replace(/ /g, '%20')
      .split('\n')
      .join('%0A');
    const url = `https://api.telegram.org/bot${process.env.REPORT_BOT_TOKEN}/sendMessage?chat_id=-936349768&text=${text}`;
    fetch(url, {
      method: 'POST',
    });
  });
}
