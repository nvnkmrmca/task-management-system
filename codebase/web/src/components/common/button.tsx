import * as React from 'react';
import { COLOR } from '../../constants';

interface IProps {
  title: string,
  onPress: () => void,
  style? : {}
};

interface IState{
};

export default class Button extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    title: '',
    onPress: () => {},
    style: {}
  }
  render() {
    return (
      <input type='button' className='btn' value={this.props.title} onClick={() => this.props.onPress()} style={{...styles.btn, ...this.props.style}} />
    );
  }
}

const styles = {
  btn: {
    backgroundColor: COLOR.PRIMARY,
    borderColor: COLOR.PRIMARY,
    color: COLOR.FONT_COLOR3,
    cursor: 'pointer'
  }
};