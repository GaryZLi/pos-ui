import axios from 'axios';
import {
    parseMessage,
} from '../actions';
import {
    updateMessage,
    dispatchToStore,
} from '../redux/actions';

const connectToServer = async () => {
    await axios
        .post('https://' + process.env.REACT_APP_SERVER, {
            x: process.env.REACT_APP_X,
            y: process.env.REACT_APP_Y,
        })
        .then()
        .catch(err => console.log(err));


    const ws = new WebSocket(`wss://${process.env.REACT_APP_SERVER}`);
    
    ws.onopen = () => dispatchToStore('ws', ws);

    ws.onmessage = ({ data }) => data.length && updateMessage(parseMessage(data));

    ws.addEventListener('error', (err) => console.log(err.message));
};

export default connectToServer;