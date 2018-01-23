import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: 'loading...'
    }
  }

  componentDidMount() {
    axios
      .get('/api/test')
      .then(res => res.data)
      .then(data => {
        console.log('here is the data', data)
        this.setState({ data })
      })
  }

  render() {
    console.log('rendered test page')
    return (
      <div>
        data: {this.state.data}
        <hr />woooo
      </div>
    )
  }
}

export default Test
