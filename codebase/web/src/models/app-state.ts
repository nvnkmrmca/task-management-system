import { IAppUser } from './app-user/app-user';
import { ICooks } from './store/cook';
import { ICart } from './store/cart';

export interface IAppState {
    AppUser: IAppUser,
    Cooks: ICooks,
    Cart: ICart
};