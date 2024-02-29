import { actionTypes } from '../action-types';
import { IAppUser } from '../../models/app-user/app-user';

const createEmptyResult = (): IAppUser => ({
    isLoggedIn: false,
    role: '',
    name: '',
    userId: ''
});

export const AppUser = (state = createEmptyResult(), action: any) => {
    switch (action.type) {
        case actionTypes.SET_LOGIN_STATUS:
            return handleLoginResult(state, action.payload);
        case actionTypes.RESET:
            state = createEmptyResult();
    }
    return state;
};

const handleLoginResult = (state: IAppUser, payload: IAppUser): IAppUser => {
    return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
        role: payload.role,
        name: payload.name,
        userId: payload.userId
    };
};