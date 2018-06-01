import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from '../loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faClock, faUpload } from '@fortawesome/fontawesome-free-solid';

const shorten = originalName =>
  (originalName.length > 44 ? `${originalName.slice(0, 44)}...` : originalName);

/**
 * COMPONENT
 */
export default (props) => {
  const { active } = props;

  let seedClass = 'seed';
  let leechClass = 'leech';
  let ratioClass = 'ratio';

  switch (active) {
    case 'seed':
      seedClass += ' active';
      break;
    case 'leech':
      leechClass += ' active';
      break;
    case 'ratio':
      ratioClass += ' active';
      break;
  }

  return (
    <div className="dl-item">
      <div className="number">#</div>
      <div className="name-detail-spread">
        <div className="name">name</div>
      </div>
    </div>
  );
};
