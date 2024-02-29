import { actionTypes } from '../action-types';
import { ICooks } from '../../models/store/cook';

const createEmptyResult = (): ICooks => ({
    data: [],
    isUpToDate: false,
    isError: false,
    errorMessage: ""
});

export const Cooks = (state = createEmptyResult(), action: any) => {
    switch (action.type) {
        case actionTypes.LOAD_COOKS:
            return handleResult(state, action.payload);
        case actionTypes.RESET:
            state = createEmptyResult();
    }
    return state;
};

const handleResult = (state: ICooks, payload: ICooks): ICooks => {
    return {
        ...state,
        data: payload.data,
        isUpToDate: payload.isUpToDate,
        isError: payload.isError,
        errorMessage: payload.errorMessage
    };
};
