import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import Loader from '../loader';

import './style.scss';

class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activated: false,
      error: false,
    };
  }

  componentDidMount() {
    const { token } = this.props.match.params;
    if (token && token.length === 32) {
      axios
        .post('/auth/access', { token })
        .then((res) => {
          if (res.data === 'activated') this.setState({ activated: true });
          else this.setState({ error: res.data });
        })
        .catch(err => this.setState({ error: 'Supplied token rejected' }));
    } else {
      this.setState({ error: 'Invalid token supplied' });
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1>Account Activation</h1>
        </div>
        <div>
          {!this.state.activated && !this.state.error && <h4>We are activating your account...</h4>}
          {this.state.activated && (
            <div className="success fullWidth center">Your account has been activated.</div>
          )}
          {this.state.error && (
            <div className="error fullWidth center">
              {' '}
              We had a problem activating your account. {`${this.state.error}.`}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ActivateAccount;
