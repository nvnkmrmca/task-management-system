import { connect } from 'react-redux';
import { IAppState } from '../models/app-state';
import { IAppUser } from '../models/app-user';
import Page from '../components/home/items';
import { IItem } from '../models/cook/item';
import { loadAll, addToCart } from '../store/actions/item';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    appUser: state.AppUser,
    cooks: state.Cooks,
    cart: state.Cart
});
const mapDispatchToProps = (dispatch: any) => ({
    onLoad: (cookId: string, callback: (result: Array<IItem>, message: string) => void) => dispatch(loadAll(cookId, callback)),
    addToCart: (cookId: String, item: Array<IItem>) => dispatch(addToCart(cookId, item))
});

export const Items = connect(mapStateToProps, mapDispatchToProps)(Page);