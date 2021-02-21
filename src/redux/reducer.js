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
    language: '中文',
    orders: [],
    tables: {},
    settings: null,
    phoneNums: [],
    menu: [],
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

        default:
            return state;
    }

};

export default reducer;