import React, { Component } from 'react';
import { Router , Route, Switch } from 'react-router-dom';
import createHistory from "history/createBrowserHistory"

import './App.css';
// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
// import '../node_modules/@coreui/styles/scss/_dropdown-menu-right.scss';

import 'react-toastify/dist/ReactToastify.css';

// Containers
import { Full } from './containers';
// Pages
// import { Login, Page404, Page500, Register } from './views/Pages';
import { Page500 } from './views/Pages';
import Login from './components/layouts/Login';
import SignUp from './components/layouts/Signup';
import Page404 from './components/layouts/Page404';

import {logout} from './lib/authenticationService';
import {loggingStatus} from './lib/authenticationService';

// import { renderRoutes } from 'react-router-config';
const history = createHistory()

class App extends Component {
  state = {
    initializationHeaderMenu: false,
    isLoggedIn: false
  };

  logoutSubmit() {
    logout().then(response => {
      if (response.flag === 1) {
        this.props.history.push('/login');
      }
    })
  };

  componentDidMount() {
    loggingStatus().then(response => {
      this.setState({initializationHeaderMenu: true});
      if (response && response.flag === 1) {
        this.setState({isLoggedIn: true});
      }
    })
  };

  render() {
    return (
      <Router  history={history}>
        <Switch>
          {/*<Route exact path="/login" name="Login Page" component={Login} />*/}
          {/*<Route exact path="/register" name="Register Page" component={Register} />*/}

          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={Full} />
        </Switch>
      </Router >
    );
  }
}

export default App;
