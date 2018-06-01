import React from 'react';

import './child-style.scss';

const BasicToolTip = props => (
  <div className="child-tooltip-holder">
    <div className="child-tooltip-on-hover">{props.children}</div>
    <div className="child-tooltip">
      <div className="child-tooltip-message">{props.message}</div>
    </div>
  </div>
);

export default BasicToolTip;
