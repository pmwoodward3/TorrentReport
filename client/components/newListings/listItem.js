import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Loader from '../loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown, faClock, faUpload } from '@fortawesome/fontawesome-free-solid';
import ToolTip from '../tooltip/child';

/**
 * COMPONENT
 */
const listItem = (props) => {
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
    <Link alt={name} to={`/listing/${id}`} className="dl-item">
      <div className="number">
        <div>{props.index + 1}</div>
      </div>
      <div className="name-detail-spread">
        <div className="name">{name}</div>
        <div className="group-holder">
          <div className="group">
            <div className={seedClass}>
              <FontAwesomeIcon icon={faCaretUp} />
              {seed}
            </div>
            <div className={leechClass}>
              <FontAwesomeIcon icon={faCaretDown} />
              {leech}
            </div>
            <div className="uploadedDate">
              <ToolTip message="Date of torrent upload">
                <FontAwesomeIcon icon={faUpload} />
              </ToolTip>{' '}
              {`${moment(earliestUpload).fromNow()} `}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default listItem;
