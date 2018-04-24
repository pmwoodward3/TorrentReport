import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth, clearError, clearSuccess } from '../../store';
import { enableSubmit } from './utils';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faHandPeace, faIdBadge } from '@fortawesome/fontawesome-free-solid';

import './style.scss';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.nameInput) this.nameInput.focus();
  }

  componentWillUnmount() {
    this.props.removeError();
    this.props.removeSuccess();
  }

  handleInputChange(event) {
    const newObj = {};
    newObj[event.target.name] = event.target.value;
    this.setState(newObj);
  }

  render() {
    const {
      name, displayName, header, handleSubmit, error, icon, success, removeES,
    } = this.props;
    let hideForms = true;
    if (!success) hideForms = false;
    const isReady = enableSubmit(this.state.email, this.state.password);
    return (
      <div className="center">
        <div className="loginBox">
          <form
            className="center flexCol"
            onSubmit={(event) => {
              event.preventDefault();
              removeES();
              return handleSubmit(event);
            }}
            name={name}
          >
            {error &&
              error.response && (
                <div className="error fullWidth center"> {error.response.data} </div>
              )}
            {success &&
              success.response && (
                <div className="success fullWidth center"> {success.response.data} </div>
              )}
            <div className="authHead">
              <div className="icon">
                <FontAwesomeIcon icon={icon} />
              </div>
              {header}
            </div>

            {!hideForms && (
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
            )}
            {!hideForms && (
              <input
                placeholder="password"
                className="loginInput"
                id="password"
                onChange={this.handleInputChange}
                value={this.state.password}
                name="password"
                type="password"
              />
            )}

            {!hideForms && (
              <button
                disable={isReady ? 'false' : 'true'}
                className={isReady ? 'loginButton' : 'disabledButton'}
                type="submit"
              >
                {displayName.toUpperCase()}
              </button>
            )}

            {!hideForms && (
              <p>
                <a href="/auth/google">{displayName} with Google</a>
              </p>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapLogin = state => ({
  name: 'login',
  header: 'welcome back',
  icon: faIdBadge,
  displayName: 'Login',
  error: state.user.error,
  success: state.user.success,
});

const mapSignup = state => ({
  name: 'signup',
  header: 'sign up',
  icon: faHandPeace,
  displayName: 'Register',
  error: state.user.error,
  success: state.user.success,
});

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(auth(email, password, formName));
  },
  removeError() {
    dispatch(clearError());
  },
  removeSuccess() {
    dispatch(clearSuccess());
  },
  removeES() {
    dispatch(clearError());
    dispatch(clearSuccess());
  },
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  success: PropTypes.object,
  icon: PropTypes.object,
};
