import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, header, handleSubmit, error } = props

  return (
    <div className="center">
      <div className="loginBox">
        <form className="center flexCol" onSubmit={handleSubmit} name={name}>
          <h2>{header.toUpperCase()}</h2>
          <div className="fullWidth">
            <label htmlFor="email">
              <small>EMAIL</small>
            </label>
            <input className="loginInput" name="email" type="text" />
          </div>
          <div className="fullWidth">
            <label htmlFor="password">
              <small>PASSWORD</small>
            </label>
            <input className="loginInput" name="password" type="password" />
          </div>
          <div>
            <button className="loginButton" type="submit">
              {displayName.toUpperCase()}
            </button>
          </div>
          {error &&
            error.response && (
              <div className="error"> {error.response.data} </div>
            )}
          <a href="/auth/google">{displayName} with Google</a>
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    header: 'Welcome',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'Register',
    header: 'Registration',
    displayName: 'Register',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
