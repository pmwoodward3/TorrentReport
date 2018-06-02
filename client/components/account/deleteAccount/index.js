import React, { Component } from 'react';
import axios from 'axios';

import './style.scss';
import Loading from '../../loader';

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      timeToReload: 10000,
      intervalHolder: 0,
      timeUpdateSeconds: 1000,
    };
  }

  startTimer = () => {
    const intervalHolder = setInterval(this.timerUpdater, this.state.timeUpdateSeconds);
    this.setState({ intervalHolder });
  };

  timerUpdater = () => {
    if (this.state.timeToReload <= 0) {
      clearInterval(this.state.intervalHolder);
      window.location.href = '../';
    }
    const newTime = this.state.timeToReload - this.state.timeUpdateSeconds;
    return this.setState({ timeToReload: newTime });
  };

  confirmedDelete = () => {
    this.setState({ status: 'deleting' });
    axios
      .get('/api/users/deleteMyAccount')
      .then(res => res.data)
      .then((message) => {
        if (message.trim() === 'success') {
          this.startTimer();
          return this.setState({ status: 'deleted' });
        }
        return this.setState({ status: 'error' });
      })
      .catch(err => this.setState({ status: 'error' }));
  };

  askToConfirm = () => {
    this.setState({ status: 'confirm' });
  };

  render() {
    if (this.state.status === 'error') {
      return (
        <div className="delete-account">
          <h1>Your Account Has NOT Been Deleted. We encountered an error. </h1>
          <p>Sorry try this again later.</p>
        </div>
      );
    }
    if (this.state.status === 'deleted') {
      const timeLeft = this.state.timeToReload / this.state.timeUpdateSeconds;
      return (
        <div className="delete-account">
          <h1>Your Account Has Been Deleted </h1>
          {timeLeft >= 2 ? (
            <p>
              This page will roload in <b>{timeLeft}</b> seconds and you are all done!
            </p>
          ) : (
            <p>Good bye my friend...</p>
          )}
        </div>
      );
    }
    if (this.state.status === 'deleting') {
      return (
        <div className="delete-account">
          <Loading message="Awaiting for server to confirm your acount has been deleted." />
        </div>
      );
    }
    if (this.state.status === 'confirm') {
      return (
        <div className="delete-account">
          <h1>Almost There. Just Confirm.</h1>
          <p>Just a reminder that you can not undo this.</p>
          <p>It was fun while it lasted mi amigo.</p>
          <p>Thanks for coming! Come back whenever.</p>
          <div className="delete-confirm" onClick={this.confirmedDelete}>
            I AM SURE. NOW DELETE THE ACCOUNT!
          </div>
        </div>
      );
    }
    return (
      <div className="delete-account">
        <h1>Delete Your Account</h1>
        <p>
          This will delete all of our info associated with your account. This can not be undone.
        </p>
        <div className="delete-confirm" onClick={this.askToConfirm}>
          DELETE MY ACCOUNT
        </div>
      </div>
    );
  }
}

export default DeleteAccount;
