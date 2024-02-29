import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import { Home } from '../containers/home';
import { IAppUser } from '../models/app-user/app-user';

interface IProps {
  appUser: IAppUser
};

interface IState{ 
};

export default class AppContainer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  };
  
  render() {
    return(
          <HashRouter>
            <Home />
          </HashRouter>
    )
  }
};