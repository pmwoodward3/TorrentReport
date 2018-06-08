import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';
import withTracker from './withTracker';
import history from './history';
import Template from './template';
import {
  Faq,
  About,
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
  DeleteAccount,
  Privacy,
  Cookies,
  Terms,
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
              <Route exact path="/" component={withTracker(Home)} />
              <Route exact path="/faq" component={withTracker(Faq)} />
              <Route exact path="/about" component={withTracker(About)} />
              <Route exact path="/listing/:id" component={withTracker(Listing)} />
              <Route exact path="/info/:id" component={withTracker(Info)} />
              <Route exact path="/group/:id" component={withTracker(Group)} />
              <Route exact path="/site/:id" component={withTracker(Site)} />
              <Route exact path="/new/listings" component={withTracker(NewListings)} />
              <Route exact path="/test" component={withTracker(Test)} />
              <Route exact path="/top" component={withTracker(Top)} />
              {isLoggedIn && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route exact path="/account" component={withTracker(AccountHome)} />
                  <Route exact path="/account/delete" component={withTracker(DeleteAccount)} />
                </Switch>
              )}
              {/* Routes placed here are available to all visitors */}
              <Route path="/login" component={withTracker(Login)} />
              <Route path="/signup" component={withTracker(Signup)} />
              <Route path="/policy/privacy" component={withTracker(Privacy)} />
              <Route path="/policy/cookies" component={withTracker(Cookies)} />
              <Route path="/policy/terms-of-service" component={withTracker(Terms)} />
              <Route path="/activate/:token" component={withTracker(ActivateAccount)} />
              <Route path="/resetpassword/:token" component={withTracker(ResetPassword)} />
              {/* Displays noMatch component as a fallback */}
              <Route path="*" component={withTracker(NoMatch)} status={404} />
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

export default connect(
  mapState,
  mapDispatch,
)(Routes);
