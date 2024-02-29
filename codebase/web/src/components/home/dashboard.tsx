import * as React from 'react';
import { Link } from 'react-router-dom';
import { View, Text, TextInput } from '../common/elements';
import { IAppUser } from '../../models/app-user';
import { ICooks } from '../../models/store/cook';
import { isNN } from '../../util';
import { ICook } from '../../models/cook';

interface IProps {
  history: any,
  appUser: IAppUser,
  cooks: ICooks
};

interface IState {
  searchText: String
};

export default class Dashboard extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      searchText: ''
    }
  };

  onSearch = (text: String) => {
    this.setState({
      searchText: text
    });
  }
  render() {
    return(
    <View className='d100'>
      <View>
        <TextInput type='text' className='d100' placeholder='Search Hotel' value={this.state.searchText + ''} onChange={(e: any) => this.onSearch(e.target.value)} />
      </View>
        {
          (this.state.searchText.length > 0 ?  this.props.cooks.data.filter((d, i) => d.name.toLowerCase().indexOf(this.state.searchText.toLowerCase() + '') >= 0) : this.props.cooks.data).map((c: ICook, i) => {
            return(
              <View key={'c' + i} className='cook'>
                <View className=''>
                  <Text className="bold">{c.name}</Text>
                </View>
                {c.address &&
                <View className=''>
                  <Text>{c.address}</Text>
                </View>
                }
                {c.mobileNo &&
                <View className=''>
                  <Text>{c.mobileNo}</Text>
                </View>
                }
                <Link to={"/items/" + c._id}>View Food Items</Link>
              </View>
        
            )
          })
        }
    </View>
    )
  }
};