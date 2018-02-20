import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth } from '../../store';

import s from './style.scss';

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);
    const newObj = {};
    newObj[event.target.name] = event.target.value;
    this.setState(newObj);
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  render() {
    console.log('state', this.state);
    const {
      name, displayName, header, handleSubmit, error,
    } = this.props;
    const isReady = this.state.email.length >= 3 && this.state.password.length >= 3;
    return (
      <div className="center">
        <div className="loginBox">
          <form className="center flexCol" onSubmit={handleSubmit} name={name}>
            {error &&
              error.response && (
                <div className="error fullWidth center"> {error.response.data} </div>
              )}
            <div className="authHead">{header}</div>
            <input
              ref={(input) => {
                this.nameInput = input;
              }}
              placeholder="email"
              className="loginInput"
              id="email"
              onChange={this.handleInputChange}
              value={this.state.email}
              name="email"
              type="text"
            />
            <input
              placeholder="password"
              className="loginInput"
              id="password"
              onChange={this.handleInputChange}
              value={this.state.password}
              name="password"
              type="password"
            />

            <button disable={isReady ? 'false' : 'true'} className={isReady ? 'loginButton' : 'disabledButton'} type="submit">
              {displayName.toUpperCase()}
            </button>

            <p>
              <a href="/auth/google">{displayName} with Google</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => ({
  name: 'login',
  header: 'welcome back buddy',
  displayName: 'Login',
  error: state.user.error,
});

const mapSignup = state => ({
  name: 'signup',
  header: 'signing up is wise',
  displayName: 'Register',
  error: state.user.error,
});

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName));
  },
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
};
