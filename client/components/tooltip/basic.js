import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/fontawesome-free-solid';

import './style.scss';

const BasicToolTip = props => (
  <div className="basic-tooltip-holder">
    <div className="basic-tooltip-on-hover">
      <FontAwesomeIcon icon={faQuestionCircle} />
    </div>
    <div className="basic-tooltip">
      <div className="basic-tooltip-message">{props.message}</div>
    </div>
  </div>
);

export default BasicToolTip;
