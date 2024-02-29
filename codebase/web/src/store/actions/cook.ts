import { actionTypes } from '../action-types';
import { ICooks } from '../../models/store/cook';
import { ICook } from '../../models/cook';
import Api from '../api/api';
import { isNNObject, isNN } from '../../util/index';

let controller: string = 'cook';

export const loadAll = (appClientId: string, callback: (result: boolean) => void) => (dispatch: any) => {
  dispatch(getCookResult([], false, false, ''));
  new Api().get(controller + 's/' + appClientId, (result: any, message: string) => {
    if (isNNObject(result) && isNNObject(result.data)) {
      dispatch(getCookResult(result.data, true, false, ''));
      callback(true);
    } else {
      callback(false);
    }
  });
};

const getCookResult = (data: Array<ICook>, isUpToDate: boolean, isError: boolean, errorMessage: string) => ({
  type: actionTypes.LOAD_COOKS,
  payload: { 
    data,
    isUpToDate,
    isError,
    errorMessage
  } as ICooks
});