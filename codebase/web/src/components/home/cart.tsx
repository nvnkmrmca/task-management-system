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
  removeFromCart: (cookId: String, item: Array<IItem>) => void
};

interface IState {
};

export default class Cart extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  };

  render() {
    let amount= 0, discount = 0;
    this.props.cart.data.map((d: IItem, i) => {
      amount += d.price;
      discount += d.discount;
    });
    return(
    <View className='d100'>
      <View className="d100">
        <View>{"Number of Items: " + this.props.cart.data.length}</View>
        <View>{"Total Amount: " +  amount}</View>
        <View>{"Discount: " +  discount}</View>
        <View>{"Amount to Pay: " +  (amount - discount)}</View>
      </View>
      <View className="d100">
        <Button title="Place Order" onPress={() => alert("Work in progress!!!")} />
      </View>
      <View className="bold d100" style={{marginTop: 15}}>Items</View>
        {
          this.props.cart.data.length > 0 ?
          this.props.cart.data.map((item: IItem, i) => {
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
                <Button title="Remove Item" onPress={() => {
                  let cart = this.props.cart.data;
                  cart.push(item);
                  this.props.removeFromCart(this.props.cart.cookId, this.props.cart.data.filter((d, i) => d._id != item._id));
                }} />
              </View>
        
            )
          })
          :
          <View>
          <Text>No items in cart</Text>
          <Link to="/"> Go to Shop</Link>
          </View>
        }
    </View>
    )
  }
};