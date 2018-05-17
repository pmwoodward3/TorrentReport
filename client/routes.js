import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import history from './history';
import Template from './template';
import {
  Login,
  Signup,
  Home,
  AccountHome,
  Test,
  Top,
  Listing,
  Info,
  Group,
  Site,
  NewListings,
  NoMatch,
  ActivateAccount,
  ResetPassword,
  ScrollToTop,
} from './components/';
import { me } from './store';

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <ScrollToTop>
          <Template>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/listing/:id" component={Listing} />
              <Route exact path="/info/:id" component={Info} />
              <Route exact path="/group/:id" component={Group} />
              <Route exact path="/site/:id" component={Site} />
              <Route exact path="/new/listings" component={NewListings} />
              <Route exact path="/test" component={Test} />
              <Route exact path="/top" component={Top} />
              {isLoggedIn && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/account" component={AccountHome} />
                </Switch>
              )}
              {/* Routes placed here are available to all visitors */}
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/activate/:token" component={ActivateAccount} />
              <Route path="/resetpassword/:token" component={ResetPassword} />
              {/* Displays noMatch component as a fallback */}
              <Route path="*" component={NoMatch} status={404} />
            </Switch>
          </Template>
        </ScrollToTop>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  /*
   Being 'logged in' for our purposes will be defined has having a state.user
   that has a truthy id. Otherwise, state.user will be an empty object, and
   state.user.id will be falsey.
  */
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
  },
});

export default connect(mapState, mapDispatch)(Routes);
