import { connect } from 'react-redux';
import { IAppState } from '../models/app-state';
import { getProfile, logout } from '../store/actions/account';
import Page from '../components/home/index';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    appUser: state.AppUser,
    cooks: state.Cooks,
    cart: state.Cart
});
const mapDispatchToProps = (dispatch: any) => ({
    getProfile: (callback: (result: boolean, message: string) => void) => dispatch(getProfile(callback)),
    onLogout: (callback: (result: boolean) => void) => dispatch(logout(callback))
});

export const Home = connect(mapStateToProps, mapDispatchToProps)(Page);