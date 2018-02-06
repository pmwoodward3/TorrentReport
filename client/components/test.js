import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'react-virtualized/styles.css';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { getData } from '../store';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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
    if (!data.length) {
      return (
        <div>
          <h1>loading...</h1>
        </div>
      );
    }
    if (!data === 'signin') {
      return (
        <div>
          <h1>you need to be signed in</h1>
        </div>
      );
    }
    return (
      <AutoSizer disableHeight>
        {({ width }) => (
          <Table
            noRowsRenderer={() => {
              'no data';
            }}
            width={width}
            height={3020}
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
