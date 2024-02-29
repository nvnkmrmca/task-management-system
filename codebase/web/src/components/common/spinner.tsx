import * as React from 'react';
import { View, Text } from '../common/elements';
import { COLOR } from '../../constants';
import Images from '../images';

interface IProps {
  visible: boolean,
  text?: string
};

interface IState{
};

export default class Spinner extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visible: false,
    text: 'Loading...'
  }
  render() {
    return (
      this.props.visible &&
      <View>
        <View className='loader-overlay'></View>
        <View className='loader'>
          <Text>...</Text>
          <View style={{color: COLOR.SECONDARY, fontWeight: 'bold', marginTop: 5}}>{this.props.text}</View>
        </View>
      </View>
    );
  }
}