import { combineReducers } from 'redux';
import { IAppState } from '../../models/app-state';
import { AppUser } from './app-user';
import { Cooks } from './cooks';
import { Cart } from './cart';

export const State = combineReducers<IAppState>({
    AppUser: AppUser,
    Cooks: Cooks,
    Cart: Cart
});
