import { actionTypes } from '../action-types';
import Api from '../api/api';
import { isNNObject, isNN } from '../../util/index';
import { IItem } from '../../models/cook/item';

let controller: string = 'item';

export const loadAll = (cookId: string, callback: (result: Array<IItem>, message: string) => void) => (dispatch: any) => {
  new Api().get(controller + 's/' + cookId, (result: any, message: string) => {
    if (isNNObject(result) && isNNObject(result.data)) {
      callback(result.data, '');
    } else {
      callback([], message);
    }
  });
};

export const addToCart = (cookId: String, item: Array<IItem>) => (dispatch: any) => {
  dispatch(AddToCartResult({cookId: cookId, data: item}));
};
  
const AddToCartResult = (data: any) => ({
    type: actionTypes.ADDTOCART,
    payload: data
  });