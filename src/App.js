import './App.css';
import { Home } from './Home';
import { Users } from './Users';
import { Items } from './Items';
import { ItemTypes } from './ItemTypes';
import { Checkouts } from './Checkouts';
import { withAuth } from './msal/MsalAuthProvider';
import { BrowserRouter, Route, Routes, NavLink, Link } from 'react-router-dom';
import { UserLogin } from './components/UserLogin';
import React, { Component } from 'react';
import { UserAgentApplication } from 'msal';

import { msalConfig } from './msal/MsalConfig';


export const msalAuth = new UserAgentApplication({
  auth: msalConfig
});


export class App extends Component {


  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: {},
      renewIframe: false,
      hasError: false,
      errorMessage: null
    };
  }


  async componentWillMount() {
    msalAuth.handleRedirectCallback(() => {
      let userAccount = msalAuth.getAccount();

      this.setState({
        isAuthenticated: true,
        user: userAccount
      });
    }, (authErr, accountState) => {  // on fail
      console.log(authErr);

      this.setState({
        hasError: true,
        errorMessage: authErr.errorMessage
      });
    });

    if (msalAuth.isCallback(window.location.hash)) {
      this.setState({
        auth: {
          renewIframe: true
        }
      });
      return;
    }

    let userAccount = msalAuth.getAccount();
    if (!userAccount) {
      msalAuth.loginRedirect({});
      return;
    } else {
      this.setState({
        isAuthenticated: true,
        user: userAccount
      });
    }
  }


  onSignIn() {
    msalAuth.loginRedirect({});
  }

  onSignOut() {
    msalAuth.logout();
  }

  render() {
    if (this.state.renewIframe) {
      return <div>hidden renew iframe - not visible</div>;
    }

    if (this.state.isAuthenticated) {
      return (
        <BrowserRouter>
          <div className="App container">
            <h3 className="d-flex justify-content-center m-3">
              React JS Frontend
            </h3>


            <nav className="navbar navbar-expand-sm bg-light navbar-dark">
              <ul className="navbar-nav">
                <li className="nav-item M-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item M-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/checkouts">
                    Checkouts
                  </NavLink>
                </li>
                
                <li className="nav-item M-1">
                  <div className="dropdown">
                    <a className="btn btn-light btn-outline-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                      Menu
                    </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><Link className="dropdown-item" to="/items">Items</Link></li>
                      <li><Link className="dropdown-item" to="/itemTypes">Item types</Link></li>
                      <li><Link className="dropdown-item" to="/users">Users</Link></li>
                      {/* <UserLogin {...this.props} /> */}
                    </ul>
                  </div>
                </li>

                <UserLogin auth={this.state} onSignIn={() => this.onSignIn()} onSignOut={() => this.onSignOut()}/>

              </ul>
            </nav>

            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/users" element={<Users />} />
              <Route exact path="/Checkouts" element={<Checkouts />} />
              <Route exact path="/Items" element={<Items />} />
              <Route exact path="/ItemTypes" element={<ItemTypes />} />

            </Routes>
          </div>
        </BrowserRouter >
      );
    }



    if (this.state.hasError) {
      return <div>{this.state.errorMessage}</div>;
    }

    return <div>Login in progress...</div>;
  }
}

export default App;
