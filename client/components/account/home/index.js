import React from 'react';
import { connect } from 'react-redux';

/**
 * COMPONENT
 */
export const AccountHome = (props) => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email,
});

export default connect(mapState)(AccountHome);
