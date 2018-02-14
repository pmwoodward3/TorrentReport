import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
/**
 * COMPONENT
 */
export default (props) => {
  const {
    title, message, linkText, linkURI,
  } = props;

  // if (!value) return <Loader />;
  return (
    <div className="home-notification">
      <div className="home-notification-head">{title}</div>
      <div className="home-notification-text">{props.children}</div>
      <div className="home-notification-action">
        <p>
          <Link to="/about">Learn More</Link>
        </p>
      </div>
    </div>
  );
};
