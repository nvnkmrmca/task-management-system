import { connect } from 'react-redux';
import { IAppState } from '../models/app-state';
import { login } from '../store/actions/account';

import Page from '../components/login/index';

const mapStateToProps = (state: IAppState, ownProps: any) => ({});
const mapDispatchToProps = (dispatch: any) => ({
    onLogin: (userName: string, password: string, callback: (result: boolean, message: string) => void) => dispatch(login(userName, password, callback))
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(Page);