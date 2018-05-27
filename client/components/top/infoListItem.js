import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/fontawesome-free-solid';
import './infoListItem.scss';

const InfoListItem = ({
  listingName, listingId, seed, leech, uploader, groupsArr, uploadDate,
}) => {
  const uploadedDateFormat = 'MM/DD/YYYY';
  const groups = [];
  const seenGroups = new Set();
  const sites = [];
  const seenSites = new Set();
  groupsArr.forEach((group) => {
    if (!seenGroups.has(group.name)) {
      groups.push(group);
      seenGroups.add(group.name);
    }
    if (!seenSites.has(group.torrentSite.name)) {
      sites.push(group.torrentSite);
      seenSites.add(group.torrentSite.name);
    }
  });

  return (
    <Link to={`/listing/${listingId}`} className="top-listing-item">
      <div className="top-list-item-header-name">{listingName}</div>

      <div className="top-list-item-collection">
        <div className="count">
          <div className="value seed">
            <FontAwesomeIcon icon={faCaretUp} /> {`${seed}`}
          </div>
          <div className="value leech">
            <FontAwesomeIcon icon={faCaretDown} /> {`${leech}`}
          </div>
        </div>
        <div className="tags">
          <div className="tags-name">Uploaded</div>
          <div className="tags-item">{moment(uploadDate).format(uploadedDateFormat)}</div>
        </div>
        <div className="tags">
          <div className="tags-name">User</div>
          <div className="tags-item">{uploader}</div>
        </div>
        <div className="tags">
          <div className="tags-name">Groups</div>
          {groups.map(group => <div key={group.id} className="tags-item">{`${group.name}`}</div>)}
        </div>
        <div className="tags">
          <div className="tags-name">Sites</div>
          {sites.map(site => <div key={site.id} className="tags-item">{`${site.name}`}</div>)}
        </div>
      </div>
    </Link>
  );
};

export default InfoListItem;
