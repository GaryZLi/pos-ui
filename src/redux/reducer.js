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
    focusedSection: {
        English: 'Appetizers',
        '中文': 'Appetizers 中文',
    }, 
    focusedItems: {
        all: false,
    },
    settings: null,
    // dinein: {}, // TODO: delete?
    // togo: {}, // TODO: delete?
    // delivery: {}, // TODO: delete?
    phoneNums: [''],
    phoneOptions: [], // TODO: move these shit inside orderList
    addresses: [{
        street: '',
        city: '',
        distance: ''
    }], // TODO: move these shit inside orderList
    addressOptions: [],
    orders: [], // maybe dont need becuz we can keep track of everything in the dinein, togo, delivery objects
    menu: [],
    modifications: [],
    totalNum: 0, // TODO: delete?
    /*
        currentNum = totalNum - orderNum;

        if (currentNum === 0) orderNum = 
    */
    orderNum: 1, // when should be increment this fucker?
    orderList: {
        biang: false,
        deleted: false, // used for shit if already billed, deleted the order from the objects
        paid: false, // all paid
        type: 'togo',
        orderNum: null,
        date: null,
        items: {},
        cash: 0,
        card: 0,
        total: 0,
        /*
        [name]: {
            price: num,
            quantity: num,
            name: {},
            options: {},
            kitchened: bool,
            paid: bool,
            delivery: bool,
            togo: bool,
            deleted: bool,
            biang: bool,
            future: date,
        }
        */
    },
    modNames: {
        'Add': {
            English: 'Add',
            '中文': 'Add 中文',
        },
        'Less': {
            English: 'Less',
            '中文': 'Less 中文',
        },
        'No': {
            English: 'No',
            '中文': 'No 中文',
        },
        'Edit': {
            English: 'Edit',
            '中文': 'Edit 中文',
        },
        'Future': {
            English: 'Future',
            '中文': 'Future 中文',
        },
        'Change': {
            English: 'Change',
            '中文': 'Change 中文',
        },
    },
};

// const itemShape = {
//     price: 0,
//     quantity: 0,
//     name: {},
//     options: {},
//     kitchened: false,
//     paid: false,
//     delivery: false,
//     togo: false,
//     deleted: false,
//     biang: false,
// };

const reducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
    switch (action.type) {
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
                phoneNums: [...state.phoneNums],
            };

        case types.UPDATE_PHONE_OPTIONS:
            return {
                ...state,
                phoneOptions: [
                    ...action.phoneOptions,
                ],
            };

        case types.UPDATE_MENU:
            return {
                ...state,
                menu: [
                    ...action.menu,
                ],
            };

        case types.UPDATE_MODIFICATIONS:
            return {
                ...state,
                modifications: [
                    ...action.modifications
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
                focusedSection: {
                    ...action.section,
                },
            };

        case types.UPDATE_ITEMS:
            // TODO deal with all selected

            switch (action.key) {
                case 'options':
                    for (const item in state.focusedItems) {
                        if (!state.focusedItems[item] || item === 'all') continue;
        
                        if (state.orderList.items[item].options[state.focusedSection.English]) {
                            if (state.orderList.items[item].options[state.focusedSection.English][action.val]) {
                                delete state.orderList.items[item].options[state.focusedSection.English][action.val];
        
                                if (!Object.keys(state.orderList.items[item].options[state.focusedSection.English]).length) {
                                    delete state.orderList.items[item].options[state.focusedSection.English];
                                }
                            }
                            else {
                                state.orderList.items[item].options[state.focusedSection.English][action.val] = true;
                            }
                        }
                        else {
                            state.orderList.items[item].options[state.focusedSection.English] = {
                                [action.val]: true,
                            };
                        }
                    }

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                case 'kitchen':
                    for (const item in state.focusedItems) {
                        if (item === 'all' || !state.focusedItems[item]) continue;

                        state.orderList.items[item].kitchened = true;
                    }

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                case 'kitchenAll':
                    for (const item in state.orderList.items) {
                        state.orderList.items[item].kitchened = true;
                        state.orderList.items[item].togo = state.orderList.type === 'togo';
                    }

                    state.orderList.orderNum = state.orderNum;
                    state.orderList.customer = {
                        addresses: [...state.addresses],
                        phoneOptions: [...state.phoneOptions],
                    };

                    return {
                        ...state,
                        orders: [
                            ...state.orders,
                            state.orderList,
                        ],
                        screenType: 'main',
                        orderNum: state.orderNum + 1,
                    };

                case 'add':
                    // TODO: v this and not deleted
                    // itemShape
                    // if (state.orderList.items[action.val.itemName].deleted) {

                    // }
                    if (state.orderList.items[action.val.itemName] && !state.orderList.items[action.val.itemName].deleted) {
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
                            [action.val.itemName]: state.focusedItems.all ? true : false,
                        },
                        orderList: {
                            ...state.orderList,
                            items: {
                                ...state.orderList.items,
                                [action.val.itemName]: {
                                    ...state.orderList.items[action.val.itemName],
                                    quantity: 1,
                                    price: parseFloat(action.val.price),
                                    name: {
                                        English: action.val.itemName,
                                        '中文': action.val.itemNameChinese,
                                    },
                                    options: {},
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

                    // TODO: need to work on biang and biangall
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

                case 'future':
                    for (const item in state.focusedItems) {
                        if (!state.focusedItems[item] || item === 'all') continue;
        
                        state.orderList.items[item].future = action.val;
                    }

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        },
                    };

                case 'quantity':
                    state.orderList.items[action.val].quantity = action.a;

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                case 'price':
                    state.orderList.items[action.val].price = action.a;

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                case 'delete':
                    for (const item in state.focusedItems) {
                        if (item === 'all' || !state.focusedItems[item]) continue;

                        state.focusedItems[item] = false;
                        state.orderList.items[item].deleted = true;
                    }

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        },
                        focusedItems: {
                            ...state.focusedItems,
                        }
                    };

                case 'deleteAll':
                    return {
                        ...state,
                        focusedSection: {
                            ...initialState.focusedSection,
                        },
                        focusedItems: {
                            ...initialState.focusedItems,
                        },
                        orderList: {
                            ...initialState.orderList,
                        },
                        addresses: [{
                            street: '',
                            city: '',
                            distance: ''
                        }],
                        addressOptions: [],
                        phoneNums: [''],
                        phoneOptions: [],
                        customerInfo: null,
                    };

                case 'delivery':
                    for (const item in state.focusedItems) {
                        if (item === 'all' || !state.focusedItems[item]) continue;

                        state.orderList.items[item].delivery = true;
                    }

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                case 'deliveryAll':
                    if (!Object.keys(state.orderList.items).length) return state;

                    for (const item in state.orderList.items) {
                        state.orderList.items[item].delivery = true;
                    }

                    state.orderList.type = 'delivery';
                    state.orderList.orderNum = state.orderNum;
                    state.orderList.customer = {
                        addresses: [...state.addresses],
                        phoneOptions: [...state.phoneOptions],
                    };

                    // orderList: {
                        //     ...initialState.orderList,
                        //     customer: {
                        //         addresses: [...state.addresses],
                        //         phoneOptions: [...state.phoneOptions],
                        //     },
                        // },

                    return {
                        ...state,
                        focusedSection: {
                            ...initialState.focusedSection,
                        },
                        focusedItems: {
                            ...initialState.focusedItems,
                        },
                        orders: [
                            ...state.orders,
                            state.orderList,
                        ],
                        screenType: 'main',
                        orderNum: state.orderNum + 1,
                    };
    

                default:
                    return {
                        ...state,
                    };
            }

        case types.UPDATE_ORDERLIST_INFO:
            switch (action.key) {
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