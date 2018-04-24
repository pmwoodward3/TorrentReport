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

  componentDidMount() {
    console.log('--> activate account props -->', this.props);
  }

  render() {
    return (
      <div>
        <div>
          <h1>Activate Your Account</h1>
        </div>
        <div>
          <p>Welcome!</p>
        </div>
      </div>
    );
  }
}

export default Test;
