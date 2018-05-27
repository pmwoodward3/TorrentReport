import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

const About = () => (
  <div className="about-page">
    <h1>About Torrent Report</h1>
    <p>
      <b>Simply:</b> A place to see torrent download statistics and information.
    </p>
    <p>
      <b>Technically:</b> An information platform that allows for the tracking of information made
      publicly available from torrent sharing websites, trackers, and the DHT(distributed hash
      table).
    </p>
    <p>
      Still want to learn more? <Link to="/faq">Visit the frequently asked questions.</Link>
    </p>
  </div>
);

export default About;
