import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { logout } from '../store';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUser, faUserPlus } from '@fortawesome/fontawesome-free-solid';
import s from './template.scss';
import nav from './nav.scss';
import mobile from './mobile.scss';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 * */
class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuShow: false,
    };
    this.mainMenuToggle = this.mainMenuToggle.bind(this);
  }

  mainMenuToggle = () => {
    this.setState({ menuShow: !this.state.menuShow });
  };

  render() {
    const {
      children, handleClick, isLoggedIn, userCount,
    } = this.props;

    return (
      <div>
        <nav role="navigation" id="nav">
          <input
            checked={this.state.menuShow}
            className="trigger"
            type="checkbox"
            id="mainNavButton"
            name="mainNavButton"
          />
          <label className="header" htmlFor="mainNavButton">
            <div className="filler" onClick={this.mainMenuToggle} />
            <div className="logo">
              <span>
                <Link to="/">Torrent Report</Link>
              </span>
            </div>
            <div className="filler" onClick={this.mainMenuToggle} />
          </label>
          <ul className="" id="main" onClick={this.mainMenuToggle}>
            <li id="TR-NAME">
              <div className="logo">
                <Link to="/">Torrent Report</Link>
              </div>
            </li>
            <li>
              <NavLink exact activeClassName="sNav" to="/test">
                <span>TEST</span>
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="sNav" to="/top">
                <span>TOP TORRENTS</span>
              </NavLink>
            </li>

            {isLoggedIn && (
              <li>
                <NavLink to="/account" activeClassName="sNav">
                  <span>ACCOUNT</span>
                </NavLink>
                <ul id="subOne">
                  <li>
                    <Link to="/account/settings">
                      <span>settings</span>
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            <li>
              <a href="/top#" className="Link-Final">
                <span>DROP DOWN</span>
              </a>
              <ul id="subOne">
                <li>
                  <a href="/top#">
                    <span>Sub Nav Item</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span>Sub Nav Item</span>
                  </a>
                </li>
              </ul>
            </li>
            {!isLoggedIn ? (
              <div className="navButtons">
                <Link to="/signup" id="navSign" className="up">
                  <FontAwesomeIcon icon={faUserPlus} /> sign up
                </Link>

                <Link to="/login" id="navSign" className="in">
                  <FontAwesomeIcon icon={faSignInAlt} /> login
                </Link>
              </div>
            ) : (
              <div className="navButtons">
                <button id="navSign" className="in" onClick={handleClick}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </div>
            )}
          </ul>
        </nav>

        <div className="content">{children}</div>
        <div className="footer">
          <div className="footerHolder">
            <div className="growBox">
              <div className="builtBox">
                <div className="builtby">BUILT BY</div>
                <div className="byme">
                  <a href="http://estepanov.io">estepanov.io</a>
                </div>
              </div>
            </div>
            <div className="growBox">{`${userCount} users online`}</div>
            <div className="growBox">
              <Link to="/faq">F.A.Q</Link>
              <Link to="/about">About</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  userCount: state.stats.userCount,
  isLoggedIn: !!state.user.id,
});

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout());
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Template));

/**
 * PROP TYPES
 */
Template.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
