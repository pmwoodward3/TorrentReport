import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import Template from './template';
import { Login, Signup, Home, UserHome, Test, Top, Listing, NewListings } from './components/';
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
        <Template>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/listing/:id" component={Listing} />
            <Route exact path="/new/listings" component={NewListings} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/top" component={Top} />
            {isLoggedIn && (
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/home" component={UserHome} />
              </Switch>
            )}
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {/* Displays our Login component as a fallback */}
            <Route component={Home} />

            {/* <Route component={Login} /> */}
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
