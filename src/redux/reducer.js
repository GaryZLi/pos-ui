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
    orders: [],
    tables: {},
};

const reducer = (state = JSON.parse(JSON.stringify(initialState)), action) => {
    switch(action.type) {
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

        default:
            return state;
    }

};

export default reducer;