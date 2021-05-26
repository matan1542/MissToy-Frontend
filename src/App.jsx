import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Home } from "./pages/Home.jsx";
import { About } from "./pages/About.jsx";
import { ToyApp } from "./pages/ToyApp.jsx";

import { Header } from "./cmps/Header.jsx";
import { Component } from "react";
import { store } from "./store/store.js";

import { login, logout, signup } from "./store/actions/user.actions.js";
import { ToyDetails } from "./pages/ToyDetails.jsx";
import { Dashboard } from "./cmps/DashBoard";
import { Login } from "./pages/Login";
import "./styles/styles.scss";
import { Provider } from "react-redux";
import SignUp from "./pages/SignUp.jsx";
// import { Chat } from './cmps/Chat';

class _App extends Component {
  render() {
    const { login, logout, user, signup } = this.props;
    return (
      <Provider store={store}>
        <div className="page-container">
          <Router>
            <Header login={login} logout={logout} user={user} />
            <main>
              <Switch>
                <Route component={ToyDetails} path={"/toy/:toyId/read"} />
                <Route component={ToyApp} path={"/toy"} />
                <Route
                  component={(props) => <Login login={login} {...props} />}
                  path={"/login"}
                />
                <Route
                  component={(props) => (
                    <SignUp login={login} signup={signup} {...props} />
                  )}
                  path={"/signup"}
                />
                <Route component={About} path={"/about"} />
                <Route component={Dashboard} path={"/dashboard"} />
                <Route component={Home} path={"/"} />
              </Switch>
            </main>
          </Router>
        </div>
      </Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userModule.loggedInUser,
  };
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
