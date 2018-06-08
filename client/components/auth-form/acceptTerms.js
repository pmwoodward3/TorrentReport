import React from 'react';
import { Link } from 'react-router-dom';

const AcceptTerms = props => (
  <div>
    <form>
      <input type="checkbox" name="ACCEPT-SETTING" value="ACCEPT-SETTING" id="ACCEPT-SETTING" />
      <label htmlFor="ACCEPT-SETTING">
        You have read and accepted our <Link to="/policy/terms-of-service">Terms of Service</Link>,{' '}
        <Link to="/policy/privacy">Privacy Policy</Link>, and{' '}
        <Link to="/policy/cookies">Cookie Policy</Link>.
      </label>
    </form>
  </div>
);

export default AcceptTerms;
