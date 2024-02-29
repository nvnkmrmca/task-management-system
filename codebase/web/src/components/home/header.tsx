import * as React from 'react';
import { Link } from 'react-router-dom';
import { View, Text, Image } from '../common/elements';
import { IAppUser } from '../../models/app-user';
import { ICart } from '../../models/store/cart';

interface IProps {
  appUser: IAppUser,
  cart: ICart,
  onLogout: (callback: (result: boolean) => void) => void
};

interface IState{ 
  isShowHomeModel: boolean
};

export default class Header extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isShowHomeModel: false
    };
    this.logout = this.logout.bind(this);
  }
  
  logout = () => {
    var con = window.confirm("Are you sure you wish to logout?");
    if(con){
      this.props.onLogout((result: boolean) => {
        if(result == true){
          alert('Logout Success!');
        }else{
          alert('Failed to logout!');
        }
      });
    }

    /*
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure you wish to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.props.onLogout((result: boolean) => {
              if(result == true){
                alert('Logout Success!');
              }else{
                alert('Failed to logout!');
              }
            });
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
    */
  };

  render() {
    console.log(this.props.cart)
    return (
      <header className='header d100'>
          <Text>Food Delivery App</Text>
          
          {
            this.props.appUser.isLoggedIn ?
            <span className='fr' onClick={this.logout}>
              <Text className='pointer'>Logout</Text>
            </span>
            :
            <Link to="/login" className='fr' style={{color: '#FFFFFF'}}>Login</Link>
          }
          <Link to="/cart" className='fr' style={{color: '#FFFFFF', marginRight: 25}}>{this.props.cart.data.length + ' Items in Cart'}</Link>
      </header>
    );
  }
};
