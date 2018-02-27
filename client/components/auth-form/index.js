import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { auth, clearError } from '../../store';
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
    this.nameInput.focus();
    if (this.props.error) this.props.removeError();
  }

  handleInputChange(event) {
    const newObj = {};
    newObj[event.target.name] = event.target.value;
    this.setState(newObj);
  }

  render() {
    const {
      name, displayName, header, handleSubmit, error, icon,
    } = this.props;

    const isReady = enableSubmit(this.state.email, this.state.password);
    return (
      <div className="center">
        <div className="loginBox">
          <form className="center flexCol" onSubmit={handleSubmit} name={name}>
            {error &&
              error.response && (
                <div className="error fullWidth center"> {error.response.data} </div>
              )}
            <div className="authHead">
              <div className="icon">
                <FontAwesomeIcon icon={icon} />
              </div>
              {header}
            </div>
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

            <button
              disable={isReady ? 'false' : 'true'}
              className={isReady ? 'loginButton' : 'disabledButton'}
              type="submit"
            >
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

const mapLogin = state => ({
  name: 'login',
  header: 'welcome back buddy',
  icon: faIdBadge,
  displayName: 'Login',
  error: state.user.error,
});

const mapSignup = state => ({
  name: 'signup',
  header: 'signing up is wise',
  icon: faHandPeace,
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
  removeError() {
    dispatch(clearError());
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
  icon: PropTypes.object,
};
