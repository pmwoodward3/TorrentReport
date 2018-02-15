import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-virtualized/styles.css';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { getData } from '../../store';
import Loader from '../loader';

import s from './style.scss';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
    };
  }

  componentDidMount() {
    axios
      .get('/api/torrents/listings')
      .then(res => res.data)
      .then((results) => {
        console.log(results);
        this.setState({ data: results });
      });
  }

  render() {
    console.log('rendered test page');
    console.log(this.state.data);
    const { data } = this.state;
    if (data === false) {
      return <Loader message="gathering details" />;
    }
    if (data === 'signin') {
      return (
        <div>
          <h1>you need to be signed in</h1>
        </div>
      );
    }
    // const heightCalc = data.length * 20 + 30;
    let heightCalc = 202 * 20;
    heightCalc += 30;
    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            noRowsRenderer={() => {
              'no data';
            }}
            width={width}
            height={heightCalc}
            headerHeight={20}
            rowHeight={30}
            rowCount={data.length}
            rowGetter={({ index }) => data[index]}
          >
            <Column label="Name" dataKey="name" width={width / 2} />
            <Column label="date found" dataKey="createdAt" width={width / 2} />
          </Table>
        )}
      </AutoSizer>
    );
  }
}

export default Test;
