import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./Security/login.component";
import Register from "./Security/register.component";
import Home from "./Security/home.component";
import Profile from "./Security/profile.component";
import BoardUser from "./Security/board-user.component";
import BoardModerator from "./Security/board-moderator.component";
import BoardAdmin from "./Security/board-admin.component";
import User from './Components/User'
import UserList from './Components/UserList';
import DelegationList from './Components/DelegationList';
import ChangePass from './Components/ChangePass';
import Delegation from './Components/Delegation';
import Footer from './Components/Footer';
import LoginFb from './Components/LoginFb'
import LoginGoogle from './Components/LoginG';
import ChangeAcceptDelegation from "./Components/ChangeAcceptDelegation";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
         
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/listUsers"} className="nav-link">
                  List Users
                </Link>
              </li>
            )}
             {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/listDelegations"} className="nav-link">
                  List Delegations
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/addDelegation"} className="nav-link">
                  Add Delegations
                </Link>
              </li>
            )}


              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/changePass"} className="nav-link">
                    Change User Password
                  </Link>
                </li>
              )}
                {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/changeAccept"} className="nav-link">
                    Change Accept Delegation
                  </Link>
                </li>
              )}


           
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.name}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
           
              <li className="nav-item">
              <Link to={"/loginFb"} className="nav-link">
                  Login Facebook
                </Link>
                </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Registration
                </Link>
              </li>

            <li>
            <Link to={"/loginGoogle"} className="nav-link">
                  Login Google
                </Link>
            </li>

			
            </div>
          )}

        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
			      <Route path="/addUser" exact component ={User}/>
			      <Route path="/listUsers" exact component ={UserList}/>
			      <Route path="/listDelegations" exact component ={DelegationList}/>
			      <Route path = "/addDelegation" exact component ={Delegation}/>
			      <Route path = "/changePass" exact component = {ChangePass}/>
			      <Route path="/edit/:id" exact component ={User}/>
			      <Route path="/editDelegation/:id" exact component ={Delegation}/>
            <Route path = "/loginFb" exact component = {LoginFb}/>
            <Route path = "/loginGoogle" exact component = {LoginGoogle}/>
            <Route path = "/changeAccept" exact component = {ChangeAcceptDelegation}/>

          </Switch>
		  <Footer/>
        </div>
      </div>
    );
  }
}

export default App;
