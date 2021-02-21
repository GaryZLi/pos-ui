import store from '../redux/store';
import * as types from './action-types';

export const updateMessage = message => {
    let type = '';
    let val;
    let key;

    switch (message.type) {
        case 'settingsRetrieve':
            type = types.UPDATE_SETTINGS;
            key = 'settings';
            val = JSON.parse(message.data);
            break;

        case 'phoneInput':
            type = types.UPDATE_PHONE_NUMS;
            key = 'phoneNums';
            val = JSON.parse(message.data);
            break;

        case 'menuRetrieve':
            type = types.UPDATE_MENU;
            key = 'menu';
            val = JSON.parse(message.data);
            break;

        default:
            return;
    };

    store.dispatch({
        type,
        [key]: val,
    });
};

export const dispatchToStore = (key, val, type = types.DISPATCH_TO_STORE) => (
    store.dispatch({
        type,
        key,
        val,
    })
);

export const updateScreenType = screenType => ({
    type: types.UPDATE_SCREEN_TYPE,
    screenType,
});

export const updateLanguage = language => ({
    type: types.UPDATE_LANGUAGE,
    language,
});

export const updatePhoneNums = phoneNums => ({
    type: types.UPDATE_PHONE_NUMS,
    phoneNums,
});