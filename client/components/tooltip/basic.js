import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getData } from '../../store';
import Loader from '../loader';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-free-solid';

import './style.scss';

class BasicToolTip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div className="basic-tooltip-holder">
        <div className="basic-tooltip-on-hover">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </div>
        <div className="basic-tooltip">
          <div className="basic-tooltip-message">{this.props.message}</div>
        </div>
      </div>
    );
  }
}

export default BasicToolTip;
