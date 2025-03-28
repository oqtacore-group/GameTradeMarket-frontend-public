import io from 'socket.io-client';

export let socket: any;

export function initEventsSocket() {
  socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
    // withCredentials: true,
    path: '/api/event',
    transports: ['polling'], // 'websocket | polling'
    auth: {
      Authorization: localStorage.getItem('token'),
    },
  });
}
