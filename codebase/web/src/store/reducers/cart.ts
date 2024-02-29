import { actionTypes } from '../action-types';
import { IItem } from '../../models/cook/item';
import { ICart } from '../../models/store/cart';

const createEmptyResult = (): ICart => ({
    cookId: '',
    data: []
})

export const Cart = (state = createEmptyResult(), action: any) => {
    switch (action.type) {
        case actionTypes.ADDTOCART:
            return handleAddToCart(state, action.payload);
    }
    return state;
};

const handleAddToCart = (state: ICart, payload: any): ICart  => {
    return {
        ...state, 
        cookId: payload.cookId,
        data: payload.data
    };
};
