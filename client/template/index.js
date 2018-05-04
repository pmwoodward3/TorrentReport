import siteConfig from '../config';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link, NavLink } from 'react-router-dom';
import { logout } from '../store';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSignOutAlt, faUser, faUserPlus } from '@fortawesome/fontawesome-free-solid';
import BuiltBy from './BuiltBy.js';
import './template.scss';
import './nav.scss';
import './mobile.scss';

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
                <Link to="/">
                  <div>Torrent Report</div>
                  <div id="logo-version-mobile">{siteConfig.version.name()}</div>
                </Link>
              </span>
            </div>
            <div className="filler" onClick={this.mainMenuToggle} />
          </label>

          <ul className="" id="main" onClick={this.mainMenuToggle}>
            <div className="logo">
              <Link id="logoId" to="/">
                Torrent Report
              </Link>
              <div id="logo-version">{siteConfig.version.name()}</div>
            </div>
            <li id="TR-NAME" />
            {/* <li>
              <NavLink exact activeClassName="sNav" to="/test">
                <span>TEST</span>
              </NavLink>
            </li> */}
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

            {/* <li>
              <NavLink to="/what" activeClassName="sNav" className="Link-Final">
                <span>Categories</span>
              </NavLink>
              <ul id="subOne">
                <li>
                  <NavLink to="/what/top" activeClassName="sNav">
                    <span>top</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/what/top2" activeClassName="sNav">
                    <span>Sub Nav Item</span>
                  </NavLink>
                </li>
              </ul>
            </li> */}
            {!isLoggedIn ? (
              <div className="navButtons">
                <Link to="/signup" id="navSign" className="up">
                  <span>
                    <FontAwesomeIcon icon={faUserPlus} /> sign up
                  </span>
                </Link>
                <Link to="/login" id="navSign" className="in">
                  <span>
                    <FontAwesomeIcon icon={faSignInAlt} /> login
                  </span>
                </Link>
              </div>
            ) : (
              <div className="navButtons">
                <button id="navSign" className="in" onClick={handleClick}>
                  <span>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </span>
                </button>
              </div>
            )}
          </ul>
        </nav>

        <div className="content">{children}</div>
        <div className="footer">
          <div className="footerHolder">
            <div className="growBox">
              <BuiltBy />
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
