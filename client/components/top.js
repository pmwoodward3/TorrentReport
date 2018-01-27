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

  componentDidMount() {}

  render() {
    return (
      <div>
        top page
        <hr />woooo
      </div>
    )
  }
}

export default Test
