import * as React from 'react';
import { View } from '../common/elements';
import { COLOR } from '../../constants';

interface IProps {
};

interface IState{ 
};

export default class Footer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  componentWillUnmount() {};
  
  render() {
    return (
      <footer className="footer d100">
        <View className='center'>Footer</View>
      </footer>
    );
  }
};
