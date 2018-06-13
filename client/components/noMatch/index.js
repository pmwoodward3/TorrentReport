import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import Loader from '../loader';

import PageHeader from '../pageHeader';

class NoMatch extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <PageHeader>Page Not Found</PageHeader>;
  }
}

export default NoMatch;
