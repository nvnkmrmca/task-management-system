import * as React from 'react';
import { Link } from 'react-router-dom';
import { View, Text } from '../common/elements';
import Button from '../common/button';
import { IAppUser } from '../../models/app-user';
import { ICooks } from '../../models/store/cook';
import { isNN } from '../../util';
import { ICook } from '../../models/cook';
import { IItem } from '../../models/cook/item';
import { ICart } from '../../models/store/cart';

interface IProps {
  match: any,
  appUser: IAppUser,
  cooks: ICooks,
  cart: ICart,
  onLoad: (cookId: string, callback: (result: Array<IItem>, message: string) => void) => void,
  addToCart: (cookId: String, item: Array<IItem>) => void
};

interface IState {
  isLoading: boolean,
  data: Array<IItem>
};

export default class Items extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      data: []
    }
  };
  
  componentDidMount() {
    let cookId = this.props.match.params.id;
    if(cookId.length > 0){
    this.setState({
        isLoading: true
    });
    this.props.onLoad(cookId, (result: Array<IItem>, message: string) => {
      this.setState({
          isLoading: false
      });
      if(result && result.length > 0){
        this.setState({
          data: result
        });
      }else if(message.length > 0){
        alert('Failed to load Profile: ' + message);
      }
    });
  }
}; 

  render() {
    return(
    <View className='d100'>
        {
          this.state.data.map((item: IItem, i) => {
            return(
              <View key={'i' + i} className='cook'>
                <View className=''>
                  <Text className="bold">{item.name}</Text>
                </View>
                {item.description &&
                <View className=''>
                  <Text>{item.description}</Text>
                </View>
                }
                {item.price &&
                <View className=''>
                  <Text>{'Rs. ' + item.price}</Text>
                </View>
                }
                <Button title="Add To Cart" onPress={() => {
                  let cart = this.props.cart.data;
                  cart.push(item);
                  this.props.addToCart(this.props.match.params.id, cart);
                }} />
              </View>
        
            )
          })
        }
    </View>
    )
  }
};