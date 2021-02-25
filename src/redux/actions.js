import store from '../redux/store';
import * as types from './action-types';

export const updateMessage = message => {
    let type = '';
    let val;
    let key;

    switch (message.type) {
        case 'settingsResults':
            type = types.UPDATE_SETTINGS;
            key = 'settings';
            val = JSON.parse(message.data);
            break;

        case 'phoneResults':
            type = types.UPDATE_PHONE_NUMS;
            key = 'phoneNums';
            val = JSON.parse(message.data);
            break;

        case 'menuResults':
            type = types.UPDATE_MENU;
            key = 'menu';
            val = JSON.parse(message.data);
            break;

        case 'modificationsResults':
            type = types.UPDATE_MODIFICATIONS;
            key = 'modifications';
            val = JSON.parse(message.data);
            break;

        case 'customerInfoResults':
            type = types.UPDATE_CUSTOMER_INFO;
            key = 'customerInfo';
            val = JSON.parse(message.data);
            break;

        case 'addressesResults':
            type = types.UPDATE_ADDRESSES;
            key = 'addresses';
            val = JSON.parse(message.data);
            break;

        case 'addressOptionsResults':
            type = types.UPDATE_ADDRESS_OPTIONS;
            key = 'addressOptions';
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

export const updateAddresses = addresses => ({
    type: types.UPDATE_ADDRESSES,
    addresses,
});

export const updateAddressOptions = addressOptions => ({
    type: types.UPDATE_ADDRESS_OPTIONS,
    addressOptions,
});

export const updateCustomerInfo = customerInfo => ({
    type: types.UPDATE_CUSTOMER_INFO,
    customerInfo,
});

export const updateFocusedItems = item => ({
    type: types.UPDATE_FOCUSED_ITEMS,
    item,
});

export const updateFocusedSection = section => ({
    type: types.UPDATE_FOCUSED_SECTION,
    section,
});

// actions should be arrays
/*
[{
    name: chow mein,
    action: ({cost}) => cost += 10
},
{
    name: lool,
    action: 
}]
*/
// [chow main, fried rice]
// [togo, less salt]
export const updateItems = (key, val, action) => ({
    type: types.UPDATE_ITEMS,
    key,
    val,
    action,
});

export const updateOrderListInfo = (key, val) => ({
    type: types.UPDATE_ORDERLIST_INFO,
    key,
    val,
});

// export const updateCurrentBiang = biang => ({
//     type: types.UPDATE_CURRENT_BIANG,
//     biang,
// });

// export const addItem = item => ({
//     type: types.ADD_ITEM,
//     item,
// });
