import * as React from 'react';
import { View, TextInput, Text } from '../common/elements';
import Button from '../common/button';
import Spinner from '../common/spinner';
import { isNN } from '../../util/index';
import { IAppUser } from '../../models/app-user';

interface IProps {
  appUser: IAppUser,
  onUpdate: (userId: string, password: string, newPassword: string, scallback: (result: boolean, message: string) => void) => void,
  onLogout: (callback: (result: boolean) => void) => void
};

interface IState{
  isLoading: boolean,
  password: string,
  newPassword: string,
  confirmNewPassword: string
};

export default class ChangePassword extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      password: '',
      newPassword: '',
      confirmNewPassword: ''
    }
    this.onUpdate = this.onUpdate.bind(this);
  };

  onUpdate = () => {
    if(isNN(this.state.password) && isNN(this.state.newPassword) && isNN(this.state.confirmNewPassword)){
      if(this.state.newPassword == this.state.confirmNewPassword){
          this.setState({
            isLoading: true
          });
          this.props.onUpdate(this.props.appUser.userId, this.state.password, this.state.newPassword, (result: boolean, message: string) => {
            this.setState({
              isLoading: false,
            });
            if(result == true){
              alert('Password updated successfully. Please login with your new password.');
              this.props.onLogout((result: boolean) => {
              });
            }else{
              alert(message);
            }
          });
      }else{
        alert('New Password and Confirm New Password not matchs.');
      }
    }else{
      alert('Please fill all the fields before Update.');
    }
  };

  render() {
      return(
        <main style={{flex: 1}}>
        <View>
          <View>
            <TextInput type='password' placeholder='Password' className='form-control' value={this.state.password} onChange={(event: any) => this.setState({password: event.target.value})} />
          </View>
          <View>
            <TextInput type='password' placeholder='New Password' className='form-control' value={this.state.newPassword} onChange={(event: any) => this.setState({newPassword: event.target.value})} />
          </View>
          <View>
            <TextInput type='password' placeholder='Confirm New Password' className='form-control' value={this.state.confirmNewPassword} onChange={(event: any) => this.setState({confirmNewPassword: event.target.value})} />
          </View>
          <View className='center'>
            <Button
            title="UPDATE"
            onPress={this.onUpdate}
            />
          </View>
          <View style={{ marginTop: 7 }}>
            <Text>Note: Password should contain adleast one uppercase, one lowercase, one number and one special character.</Text>
          </View>
        </View>
        <Spinner visible={this.state.isLoading} />
      </main>
      );
  }
};