import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { View, Text } from '../common/elements';
import Spinner from '../common/spinner';
import { IAppUser } from '../../models/app-user';
import Header from './header';
import Footer from './footer';
import { COLOR, ROLE } from '../../constants';
import { Login } from '../../containers/login';
import { Dashboard as CDashboard} from '../../containers/dashboard';
import { Items as CItems} from '../../containers/items';
import { Cart as CCart} from '../../containers/cart';
import { ChangePassword as CChangePassword } from '../../containers/change-password';
import NotFound from '../../components/not-found';
import { ICooks } from '../../models/store/cook';
import { IItem } from '../../models/cook/item';
import { ICart } from '../../models/store/cart';

interface IProps {
  appUser: IAppUser,
  cooks: ICooks,
  cart: ICart,
  getProfile: (callback: (result: boolean, message: string) => void) => void,
  onLogout: (callback: (result: boolean) => void) => void
};

interface IState{
  isLoading: boolean
};

export default class Index extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false
    }
  };

  componentDidMount() {
    if(!this.props.cooks || this.props.cooks.isUpToDate != true){
      this.setState({
          isLoading: true
      });
      this.props.getProfile( (result: boolean, message: string) => {
        this.setState({
            isLoading: false
        });
        if(result != true){
          alert('Failed to load Profile: ' + message);
        }
      });
    }
  }; 

  render() {
    return (
      !this.state.isLoading &&
        <View className="container">
          <Header appUser={this.props.appUser} cart={this.props.cart} onLogout={this.props.onLogout}/>
            <View style={{padding: '0px 15px'}}>
              <Link to="/">Home</Link>
            </View>
            <View className="content">
              <Switch>
                <Route path={'/'} exact component={CDashboard} />
                <Route path={'/items/:id'} exact component={CItems} />
                <Route path={'/cart'} exact component={CCart} />
                <Route path={'/login'} exact component={Login} />
                <Route path={'/change-password'} exact component={CChangePassword} />
                <Route component={NotFound} />
              </Switch>
            </View>
          <Footer />
          <Spinner visible={this.state.isLoading} text={"Loading..."} />
        </View>
    );
  }
}