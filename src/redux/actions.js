import * as types from './action-types';

export const updateScreenType = screenType => ({
    type: types.UPDATE_SCREEN_TYPE,
    screenType,
});