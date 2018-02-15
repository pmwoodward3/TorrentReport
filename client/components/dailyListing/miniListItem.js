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
  const { name, id, Infos } = props.item;
  const { active } = props;
  const seed = Infos.reduce((acc, curr) => acc + curr.seed, 0);
  const leach = Infos.reduce((acc, curr) => acc + curr.leach, 0);
  const earliestUpload = Infos.reduce(
    (earliestDate, currInfo) =>
      (new Date(currInfo.uploadDate) < earliestDate ? new Date(currInfo.uploadDate) : earliestDate),
    new Date(),
  );

  let seedClass = 'seed';
  let leachClass = 'leach';
  if (active === 'seed') {
    seedClass += ' active';
  } else {
    leachClass += ' active';
  }

  return (
    <div className="dl-item">
      <div className="number">
        <div>{props.index + 1}</div>
      </div>
      <Link alt={name} to={`/listing/${id}`}>
        {shorten(name)}
      </Link>
      <div className="group">
        <div className="sub">
          <div className={seedClass}>
            <FontAwesomeIcon icon={faCaretUp} /> {seed}
          </div>
          <div className={leachClass}>
            <FontAwesomeIcon icon={faCaretDown} /> {leach}
          </div>
        </div>
        <div className="uploadedDate">{`${moment(earliestUpload).fromNow()} `}</div>
      </div>
    </div>
  );
};
