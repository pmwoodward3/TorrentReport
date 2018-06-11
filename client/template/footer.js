import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
// import { lighten, darken } from 'polished';
import moment from 'moment';
import BuiltBy from './BuiltBy';

const StyledFooter = styled.div`
  background-color: #f2f2f2;
`;

const PolicyLink = styled(Link)`
  color: #a7a7a7;
  padding: 5px;
  text-decoration: none;
  &:hover {
    color: #4d4d4d;
    text-decoration: underline;
  }
  &:visited {
    color: #a7a7a7;
  }
`;

const PolicyHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media (max-width: ${props => props.theme.mobile.width}) {
    flex-direction: column;
  }
`;

const Build = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: lightgrey;
  padding: 20px;
  @media (max-width: ${props => props.theme.mobile.width}) {
    text-align: center;
  }
`;

const Footer = ({ userCount }) => (
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
    <StyledFooter>
      <PolicyHolder>
        <PolicyLink to="/policy/privacy">Privacy Policy</PolicyLink>
        <PolicyLink to="/policy/cookies">Cookie Policy</PolicyLink>
        <PolicyLink to="/policy/terms-of-service">Terms of Service</PolicyLink>
      </PolicyHolder>
      <Build>
        Current Version Build Date<br />
        {moment(BUILD_DATE).format('MMMM Do YYYY, h:mm:ss a')}
      </Build>
    </StyledFooter>
  </div>
);

const mapState = state => ({
  userCount: state.stats.userCount,
});

export default connect(mapState)(Footer);
