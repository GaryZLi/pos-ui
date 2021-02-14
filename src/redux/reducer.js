import * as types from './action-types';

/*
=====================
|    SCREENTYPES    |
=====================
- main
- takeOut
- order

===================
|    LANGUAGES    |
===================
- English
- Chinese
*/

const initialState = {
    screenType: 'main',
    language: 'English',
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