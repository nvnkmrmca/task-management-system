import { connect } from 'react-redux';
import { IAppState } from '../models/app-state';
import { IAppUser } from '../models/app-user';
import Page from '../components/home/cart';
import { IItem } from '../models/cook/item';
import { addToCart } from '../store/actions/item';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    appUser: state.AppUser,
    cooks: state.Cooks,
    cart: state.Cart
});
const mapDispatchToProps = (dispatch: any) => ({
    removeFromCart: (cookId: String, item: Array<IItem>) => dispatch(addToCart(cookId, item))
});

export const Cart = connect(mapStateToProps, mapDispatchToProps)(Page);