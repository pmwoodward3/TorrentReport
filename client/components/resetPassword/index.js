import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import Loader from '../loader';

import './style.scss';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1>Reset Password Form</h1>
      </div>
    );
  }
}

export default Test;
