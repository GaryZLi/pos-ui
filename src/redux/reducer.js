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
    taxRate: 0.0975,
    language: 'English',
    focusedSection: {
        English: 'Appetizers',
        '中文': 'Appetizers 中文',
    }, 
    focusedItems: {
        all: false,
    },
    settings: null,
    orders: [], // maybe dont need becuz we can keep track of everything in the dinein, togo, delivery objects
    menu: [],
    modifications: [],
    /*
        currentNum = totalNum - orderNum;

        if (currentNum === 0) orderNum = 
    */
    orderNum: 1, // when should be increment this fucker?
    orderList: {
        phoneNums: [''],
        phoneOptions: [],
        addresses: [{
            street: '',
            city: '',
            distance: ''
        }],
        addressOptions: [],
        customerInfo: null,
        biang: false,
        deleted: false, // used for shit if already billed, deleted the order from the objects
        paid: false, // all paid
        type: 'togo',
        orderNum: null,
        date: null,
        items: {},
        cash: 0,
        card: 0,
        // total: 0,
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
    let updatedOrders;
    let updatedOrderNum;

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
                orderList: {
                    ...state.orderList,
                    phoneNums: [
                        ...action.phoneNums,
                    ],
                }
            };

        case types.UPDATE_PHONE_OPTIONS:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    phoneOptions: [
                        ...action.phoneOptions,
                    ],
                }
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
                orderList: {
                    ...state.orderList,
                    customerInfo: action.customerInfo
                },
            };

        case types.UPDATE_ADDRESSES:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    addresses: [
                        ...action.addresses,
                    ],
                },
            };

        case types.UPDATE_ADDRESS_OPTIONS:
            return {
                ...state,
                orderList: {
                    ...state.orderList,
                    addressOptions: [
                        ...action.addressOptions,
                    ],
                }
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

                        if (state.orderList.type === 'togo') {
                            state.orderList.items[item].togo = true;
                            state.orderList.items[item].delivery = false;
                        }
                        else {
                            state.orderList.items[item].togo = false;
                            state.orderList.items[item].delivery = true;
                        }
                    }

                    if (state.orderList.orderNum) {
                        state.orders[state.orderList.orderNum - 1] = state.orderList;
                        updatedOrders = state.orders;
                        updatedOrderNum = state.orderNum;
                    }
                    else {
                        state.orderList.orderNum = state.orderNum;
                        state.orderList.customer = {
                            addresses: [...state.orderList.addresses],
                            phoneOptions: [...state.orderList.phoneOptions],
                        };
                        updatedOrders = [
                            ...state.orders,
                            state.orderList,
                        ];
                        updatedOrderNum = state.orderNum + 1;
                    }

                    return {
                        ...state,
                        orders: updatedOrders,
                        screenType: 'main',
                        orderNum: updatedOrderNum,
                    };

                case 'add':
                    // already has the item in the order and not deleted
                    // state.orderList.items[action.val.itemName].price
                    const price = parseFloat(action.val.price);

                    if (state.orderList.items[action.val.itemName] && !state.orderList.items[action.val.itemName].deleted) {
                        return {
                            ...state,
                            orderList: {
                                ...state.orderList,
                                // total: state.orderList.total + (price + (price * state.taxRate)),
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
                            // total: state.orderList.total + (price + (price * state.taxRate)),
                            items: {
                                ...state.orderList.items,
                                [action.val.itemName]: {
                                    ...state.orderList.items[action.val.itemName],
                                    quantity: 1,
                                    price,
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
                    const biangAll = () => {
                        for (const item in state.orderList.items) {
                            state.orderList.items[item].biang = !state.orderList.biang;
                        }
                    };

                    const selectedItems = [];

                    for (const item in state.focusedItems) {
                        if (item === 'all' || !state.focusedItems[item]) continue;

                        selectedItems.push(item);
                    }

                    if (state.focusedItems.all || !selectedItems.length) {
                        biangAll();

                        return {
                            ...state,
                            orderList: {
                                ...state.orderList,
                                biang: !state.orderList.biang,
                            }
                        };
                    }

                    for (const item of selectedItems) {
                        state.orderList.items[item].biang = !state.orderList.items[item].biang;
                    }

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

                case 'delivery':
                    for (const item in state.focusedItems) {
                        if (item === 'all' || !state.focusedItems[item]) continue;

                        state.orderList.items[item].delivery = !state.orderList.items[item].delivery;

                        if (state.orderList.items[item].delivery)
                            state.orderList.items[item].togo = false;
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
                        state.orderList.items[item].togo = false;
                    }

                    state.orderList.type = 'delivery';
                    
                    if (state.orderList.orderNum) {
                        state.orders[state.orderList.orderNum - 1] = state.orderList;
                        updatedOrders = state.orders;
                        updatedOrderNum = state.orderNum;
                    }
                    else {
                        state.orderList.orderNum = state.orderNum;
                        state.orderList.customer = {
                            addresses: [...state.orderList.addresses],
                            phoneOptions: [...state.orderList.phoneOptions],
                        };
                        updatedOrders = [
                            ...state.orders,
                            state.orderList,
                        ];
                        updatedOrderNum = state.orderNum + 1;
                    }

                    return {
                        ...state,
                        focusedSection: {
                            ...initialState.focusedSection,
                        },
                        focusedItems: {
                            ...initialState.focusedItems,
                        },
                        orders: updatedOrders,
                        screenType: 'main',
                        orderNum: updatedOrderNum,
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

                case 'pay':
                    let totalCost = 0;
                    
                    for (const item in state.orderList.items) {
                        if (!state.orderList.items[item].paid)
                            totalCost += state.orderList.items[item].price * state.orderList.items[item].quantity;
                    }
                    
                    totalCost = totalCost + (totalCost * state.taxRate);
                    
                    // paid in full
                    if (action.val + action.a >= totalCost) {
                        for (const item in state.orderList.items) {
                            state.orderList.items[item].paid = true;
                        }

                        state.orderList.paid = true;
                    }
                    // only paid selected
                    else {
                        for (const item in state.focusedItems) {
                            state.orderList.items[item].paid = true;
                        }
                    }

                    state.orderList.cash += action.val;
                    state.orderList.card += action.a;

                    return {
                        ...state,
                        orderList: {
                            ...state.orderList,
                        }
                    };

                case 'delete':
                    if (window.confirm('Deleted this order?')) {
                        if (action.val) {
                            state.orders[action.val - 1].deleted = true;
                        }
                        
                        return {
                            ...state,
                            screenType: 'main',
                            orders: [...state.orders],
                            focusedSection: {
                                ...initialState.focusedSection,
                            },
                            focusedItems: {
                                ...initialState.focusedItems,
                            },
                            orderList: JSON.parse(JSON.stringify(initialState.orderList)),
                        }
                    }

                    return state;

                case 'new':
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
                    };

                case 'open':
                    const updatedFocusedItems = {};

                    for (const item in state.orders[action.val - 1].items) {
                        updatedFocusedItems[item] = false;
                    }

                    updatedFocusedItems.all = false;

                    return {
                        ...state,
                        screenType: 'order',
                        orderList: {
                            ...state.orders[action.val - 1],
                        },
                        focusedItems: updatedFocusedItems,
                    }
                    
                case 'update':
                    state.orders[action.val - 1] = state.orderList;

                    return {
                        ...state,
                        orders: [
                            ...state.orders,
                        ],
                        // screenType: 'main',
                    };       
                    
                default:
                    return state;
            }

        default:
            return state;
    }

};

export default reducer;