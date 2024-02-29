import { connect } from 'react-redux';
import { IAppState } from '../models/app-state';
import { changePassword, logout } from '../store/actions/account';

import Page from '../components/home/change-password';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
});
const mapDispatchToProps = (dispatch: any) => ({
    onUpdate: (userId: string, password: string, newPassword: string, callback: (result: boolean, message: string) => void) => dispatch(changePassword(userId, password, newPassword, callback)),
    onLogout: (callback: (result: boolean) => void) => dispatch(logout(callback))
});

export const ChangePassword = connect(mapStateToProps, mapDispatchToProps)(Page);