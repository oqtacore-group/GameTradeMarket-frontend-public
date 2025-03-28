export function initTransactionSocket(setSocket: (wss: any) => void) {
  const socket = new WebSocket('wss://5vgs2lldhe.execute-api.us-east-1.amazonaws.com/production/');

  (function () {
    return new Promise((resolve) => {
      socket.onopen = function (event: any) {
        console.log('[open] Socket connection.', event);
        resolve(socket);
      };
    })
      .then(() => {
        socket.send(
          JSON.stringify({
            event: 'connect',
            userName: 'igor',
            password: 'j#AsMGq9!b3U<]QN',
            onlyGames: true,
          })
        );
        setSocket(socket);
      })
      .catch((e) => {
        console.log('error websocket', e);
      });
  })();
  // socket.onmessage = (message: any) => {
  //   console.log('message', message);
  // };
}
