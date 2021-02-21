export const parseMessage = message => {
    let current = 0;

    while (message[current] !== '|') current++;

    return {
        type: message.substring(0, current),
        data: message.substring(current + 1),
    };
};
