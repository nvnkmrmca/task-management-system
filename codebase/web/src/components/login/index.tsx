import * as React from 'react';
import { View, Text, TextInput, Image } from '../common/elements';
import Button from '../common/button';
import Spinner from '../common/spinner';
import Images from '../images';
import { COLOR } from '../../constants';
import { isNN } from '../../util';

interface IProps {
    onLogin: (userName: string, password: string, callback: (result: boolean, message: string) => void) => void,
    onForgetPassword: (mobileNumber: string, email: string, callback: (result: boolean, message: string) => void) => void
}

interface IState{
    userName: string,
    password: string,
    message: string,
    isLoading: boolean,
    isForgetPass: boolean,
    mobileNumber: string,
    email: string
};

export default class Index extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            message: '',
            isLoading: false,
            isForgetPass: false,
            mobileNumber: '',
            email: ''
        };
        this.onLogin = this.onLogin.bind(this);
        this.onForgetPassword = this.onForgetPassword.bind(this);
        this.onCreateAccount = this.onCreateAccount.bind(this);
        this.onForgetPassSubmit = this.onForgetPassSubmit.bind(this);
    };

    componentWillUnmount() {};

    onLogin = () =>{
        if(isNN(this.state.userName) && isNN(this.state.password)){
            this.setState({
                message: '',
                isLoading: true
            });
            this.props.onLogin(this.state.userName, this.state.password, (result: boolean, message: string) => {
                if(result == true){                        
                    this.setState({
                        isLoading: false,
                        message: ''
                    });
                }else{
                    this.setState({
                        message: message,
                        isLoading: false
                    });
                }
            });
        }else{
            alert('Enter Mobile Number and Password to continue.');
        }
    };
    
    onForgetPassword = () =>{
        this.setState({
            isForgetPass: true,
            mobileNumber: '',
            email: '',
            message: ''
        });
    };

    onCreateAccount = () =>{
        alert('Contact administrator/manager to create/join your flat.');
    };

    onForgetPassSubmit = () => {
        if(isNN(this.state.mobileNumber) && isNN(this.state.email)){
            this.setState({
                message: '',
                isLoading: true
            });
            this.props.onForgetPassword(this.state.mobileNumber, this.state.email.toLowerCase(), (result: boolean, message: string) => {
                if(result == true){
                    alert('Password reset success. Login with New password sent to your Email. Change password after login.');
                    this.setState({
                        isLoading: false,
                        message: '',
                        isForgetPass: false,
                        userName: '',
                        password: ''
                    });
                }else{
                    this.setState({
                        message: message,
                        isLoading: false
                    });
                }
            });
        }else{
            alert('Enter Mobile Number and Email to continue.');
        }
    };

  render() {
    return (
            <View className='container' style={{backgroundColor: COLOR.INVERSE, maxWidth: '270px'}}>
                <View className='row' style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginBottom: 30, marginTop: 5}}>
                    <Text>LOGIN</Text>
                </View>
                <View className='row' style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                    <View className='col-12' style={styles.row}>
                        <TextInput type='text' className='form-control' placeholder='Mobile Number' style={{...styles.txt}} value={this.state.userName} onChange={(event: any) => this.setState({userName: event.target.value})} />
                    </View>
                    <View className='col-12' style={{...styles.row, marginBottom: 15}}>
                        <TextInput type='password'  className='form-control' placeholder='Password' value={this.state.password} style={{...styles.txt}} onChange={(event: any) => this.setState({password: event.target.value})} />
                    </View>
                    <Text className='col-12 pointer' onClick={this.onForgetPassword} style={{marginBottom: 15, textAlign: 'right', color: COLOR.SECONDARY}}>Forgot Password?</Text>
                    <Button
                    title={this.state.isLoading == false ? "LOGIN" : "Loading..."}
                    onPress={this.onLogin}
                    />
                    <Text className='col-12 center' style={{marginTop: 5, color: (this.state.isLoading ? COLOR.FONT_COLOR2 : COLOR.ERROR)}}>{this.state.message}</Text>

                </View>
                <Spinner visible={this.state.isLoading} text={""} />
            </View>
    );
  }
};

const styles = {
    row: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginBottom: 25
    },     
    txtIcon: {
        marginLeft: 3,
        // marginRight: -15,
        height: 15,
        width: 15,
        resizeMode : 'stretch',
        alignItems: 'center',
        top: 11

    },
    txt: {
        flex: 1,
        paddingLeft: 20
    }
};