import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'loading...',
    };
  }

  componentDidMount() {}
  render() {
    const { Table, Tr, Td } = Reactable;
    return (
      <div>
        top page
        <hr />
      </div>
    );
  }
}

export default Test;
