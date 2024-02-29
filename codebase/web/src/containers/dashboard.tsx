import { connect } from 'react-redux';
import { IAppState } from '../models/app-state';
import { IAppUser } from '../models/app-user';
import Page from '../components/home/dashboard';

const mapStateToProps = (state: IAppState, ownProps: any) => ({
    appUser: state.AppUser,
    cooks: state.Cooks
});
const mapDispatchToProps = (dispatch: any) => ({
});

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(Page);