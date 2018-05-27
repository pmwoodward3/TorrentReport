import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';

const shorten = originalName =>
  (originalName.length > 44 ? `${originalName.slice(0, 44)}...` : originalName);

/**
 * COMPONENT
 */
const MiniListItem = (props) => {
  const { name, id, Infos } = props.item;
  const { active } = props;
  const seed = Infos.reduce((acc, curr) => acc + curr.seed, 0);
  const leech = Infos.reduce((acc, curr) => acc + curr.leech, 0);
  const earliestUpload = Infos.reduce(
    (earliestDate, currInfo) =>
      (new Date(currInfo.uploadDate) < earliestDate ? new Date(currInfo.uploadDate) : earliestDate),
    new Date(),
  );

  let seedClass = 'seed';
  let leechClass = 'leech';
  if (active === 'seed') {
    seedClass += ' active';
  } else {
    leechClass += ' active';
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
          <div className={leechClass}>
            <FontAwesomeIcon icon={faCaretDown} /> {leech}
          </div>
        </div>
        <div className="uploadedDate">{`${moment(earliestUpload).fromNow()} `}</div>
      </div>
    </div>
  );
};

export default MiniListItem;
