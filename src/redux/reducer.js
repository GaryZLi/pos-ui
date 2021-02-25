import * as types from './action-types';

/*
=====================
|    SCREENTYPES    |
=====================
- main
- order
- list

===================
|    LANGUAGES    |
===================
- English
- Chinese
*/

const initialState = {
    screenType: 'order',
    language: 'English',
    focusedSection: 'Poultry & Meat Dishes', // TODO: maybe make this an object, so she can select multiple
    focusedItems: {
        all: false,
    },
    settings: null,
    dinein: {},
    togo: {},
    delivery: {},
    phoneNums: [], // TODO: move these shit inside orderList
    addresses: [], // TODO: move these shit inside orderList
    addressOptions: [],
    orders: [], // maybe dont need becuz we can keep track of everything in the dinein, togo, delivery objects
    menu: [],
    totalNum: 0, 
    /*
        currentNum = totalNum - orderNum;

        if (currentNum === 0) orderNum = 
    */
    orderNum: 0, // when should be increment this fucker?
    orderList: {
        biang: false,
        deleted: false,
        paid: false, // all paid
        type: '',
        // delivery: false, /* prob dont need becuz we'll use the other object */
        // takeOut: false,
        // table: null,
        orderNum: null,
        date: null,
        items: {},
        cash: 0,
        card: 0,
        total: 0,
        /*
        [name]: {
            cost: num,
            quantity: num,
            name: {},
            options: [],
            kitchened: bool,
            paid: bool,
            delivery: bool,
            togo: bool,
            deleted: bool,
            biang: bool,
        }
        */
        // items: [],
        // cost: {},
        // quantity: {},
        // options: {},
    },
};

const reducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
    switch(action.type) {
        case types.DISPATCH_TO_STORE:
            return {
                ...state,
                [action.key]: action.val,
            };

        case types.UPDATE_SCREEN_TYPE:
            return {
                ...state,
                screenType: action.screenType,
            };

        case types.UPDATE_LANGUAGE:
            const languages = {
                '中文': 'English',
                English: '中文',
            };

            return {
                ...state,
                language: languages[action.language],
            };

        case types.UPDATE_SETTINGS:
            return {
                ...state,
                settings: action.settings,
            };

        case types.UPDATE_PHONE_NUMS:
            return {
                ...state,
                phoneNums: [
                    ...action.phoneNums,
                ],
            };

        case types.UPDATE_MENU:
            return {
                ...state,
                menu: [
                    ...action.menu,
                ],
            };

        case types.UPDATE_CUSTOMER_INFO:
            return {
                ...state,
                customerInfo: action.customerInfo,
            };

        case types.UPDATE_ADDRESSES:
            return {
                ...state,
                addresses: [
                    ...action.addresses,
                ],
            };

        case types.UPDATE_ADDRESS_OPTIONS:
            return {
                ...state,
                addressOptions: [
                    ...action.addressOptions,
                ],
            };

        case types.UPDATE_FOCUSED_ITEMS:
            
            if (action.item === 'all') {
                // on, so turn off
                if (state.focusedItems['all']) {
                    for (const item in state.focusedItems) {
                        state.focusedItems[item] = false;
                    }
                }
                else {
                    for (const item in state.focusedItems) {
                        state.focusedItems[item] = true;
                    }
                }
            }
            else {
                if (state.focusedItems[action.item]) {
                    state.focusedItems[action.item] = false;
                    state.focusedItems.all = false;
                }
                else {
                    state.focusedItems[action.item] = true;
                }

            }

            return {
                ...state,
                focusedItems: {
                    ...state.focusedItems,
                }
            };

        case types.UPDATE_FOCUSED_SECTION:
            return {
                ...state,
                focusedSection: action.section,
            };

        case types.UPDATE_ITEMS:
            // TODO deal with all selected

            switch(action.key) {
                case 'options':
                    return {
                        ...state,
                        // orderList: {
                        //     ...state.orderList,
                        //     options: {
                        //         ...state.orderList.options,
                        //         [state.focusedItems]: action.action + ' -> ' + action.val,
                        //     }
                        // }
                    };

                case 'kitchen':
                    if (!state.focusedItems) return state;

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                            items: {
                                ...state.orderList.items,
                                [state.focusedItems]: {
                                    ...state.orderList.items[state.focusedItems],
                                    kitchened: true,
                                }
                            }
                        }
                    };

                case 'kitchenAll': 
                    for (const item in state.orderList.items) {
                        state.orderList.items[item].kitchened = true;
                    }

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                case 'add':
                    if (state.orderList.items[action.val.itemName]) {
                        return {
                            ...state,
                            orderList: {
                                ...state.orderList,
                                items: {
                                    ...state.orderList.items,
                                    [action.val.itemName]: {
                                        ...state.orderList.items[action.val.itemName],
                                        quantity: state.orderList.items[action.val.itemName].quantity + 1,
                                    }
                                }
                            }
                        };
                    }

                    return {
                        ...state,
                        focusedItems: {
                            ...state.focusedItems,
                            [action.val.itemName]: state.focusedItems.all? true : false,
                        },
                        orderList: {
                            ...state.orderList,
                            items: {
                                ...state.orderList.items,
                                [action.val.itemName]: {
                                    ...state.orderList.items[action.val.itemName],
                                    quantity: 1,
                                    cost: parseFloat(action.val.price),
                                    name: {
                                        English: action.val.itemName,
                                        '中文': action.val.itemNameChinese,
                                    },
                                    options: [],
                                    kitchened: false,
                                    paid: false,
                                    delivery: false,
                                    togo: false,
                                    deleted: false,
                                    biang: false,
                                }
                            }
                        }
                    };

                case 'biang':
                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                            items: {
                                ...state.orderList.items,
                                [state.focusedItems]: {
                                    ...state.orderList.items[state.focusedItems],
                                    biang: true,
                                }
                            }
                        }
                    };

                case 'biangAll':
                    if (state.orderList.biang) {
                        for (const item in state.orderList.items) {
                            state.orderList.items[item].biang = false;
                        }
                    }
                    else {
                        for (const item in state.orderList.items) {
                            state.orderList.items[item].biang = true;
                        }
                    }

                    state.orderList.biang = !state.orderList.biang;

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                default:
                    return {
                        ...state,
                    };
            }

        case types.UPDATE_ORDERLIST_INFO:
            switch(action.key) {
                case 'date':
                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                            date: new Date(),
                        }
                    };

                default:
                    return state;
            }

        default:
            return state;
    }

};

export default reducer;