import axios from 'axios';

const connect = async () => {
    await axios
        .post('https://' + process.env.REACT_APP_SERVER, {
            x: 'process.env.REACT_APP_X',
            y: process.env.REACT_APP_Y,
        })
        .then()
        .catch(err => console.log(err));


    const ws = new WebSocket(`wss://${process.env.REACT_APP_SERVER}`, 'LOL');

    ws.onopen = function open() {
        ws.send('hello from client');
    };

    ws.onmessage = function incoming(data) {
        console.log(data.data);

    };

    ws.addEventListener('error', (err) => console.log(err.message));
};

connect();