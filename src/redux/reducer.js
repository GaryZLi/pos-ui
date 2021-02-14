import * as types from './action-types';

const initialState = {
    screenType: 'order',
    language: 'english',
    orders: [

    ],
    tables: {
        
    },
};

const reducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
    switch(action.type) {
        case types.UPDATE_SCREEN_TYPE:
            return {
                ...state,
                screenType: action.screenType,
            };

        default:
            return state;
    }

};

export default reducer;