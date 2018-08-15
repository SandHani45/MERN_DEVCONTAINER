import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOut } from "./actions/authAction";
import { clearCurrentProfile } from "./actions/profileAction";
import { Provider } from "react-redux";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import PrivateRouter from "./components/common/PrivateRouter";
import "./App.css";

//store data
import store from "./store";

if (localStorage.jwtToken) {
  // set auth token in header
  setAuthToken(localStorage.jwtToken);
  //decode token and get user
  const decode = jwt_decode(localStorage.jwtToken);
  //Set user  and Authrozided
  store.dispatch(setCurrentUser(decode));

  //check of the expire token
  const currentTime = Date.now() / 1000;
  if (decode.exp < currentTime) {
    //   logout
    store.dispatch(logOut());
    // clear current profile
    store.dispatch(clearCurrentProfile());
    //redireact to login
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRouter exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
