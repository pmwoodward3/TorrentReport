import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
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
  ScrollToTopRoute,
} from './components/';
import { me, fetchGroups } from './store';

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
        <Template>
          <Switch>
            <ScrollToTopRoute exact path="/" component={Home} />
            <ScrollToTopRoute exact path="/listing/:id" component={Listing} />
            <ScrollToTopRoute exact path="/info/:id" component={Info} />
            <ScrollToTopRoute exact path="/group/:id" component={Group} />
            <ScrollToTopRoute exact path="/site/:id" component={Site} />
            <ScrollToTopRoute exact path="/new/listings" component={NewListings} />
            <Route exact path="/test" component={Test} />
            <ScrollToTopRoute exact path="/top" component={Top} />
            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <ScrollToTopRoute path="/account" component={AccountHome} />
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
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me());
    dispatch(fetchGroups());
  },
});

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
