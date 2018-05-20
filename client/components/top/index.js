import React from 'react';
import { connect } from 'react-redux';
// import JwPagination from 'jw-react-pagination';

import Filter from './filter';
import { fetchTopNewSnapshots } from '../../store';
import Loader from '../loader';
import './style.scss';

import InfoListItem from './infoListItem';

class TopNewSnapshots extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItems: [],
    };
  }

  render() {
    console.log('state', this.state);
    if (this.props.topNewSnapshots.state !== 'ready') {
      if (this.props.topNewSnapshots.state !== 'loading') this.props.load();
      return <Loader message="random" />;
    }
    console.log('location search :: ', this.props.location.search);
    return (
      <div className="top-container">
        <Filter />
        top page (count: {this.props.topNewSnapshots.items.length} | pages:{' '}
        {this.props.topNewSnapshots.items.length / 30} )
        <hr />
        {this.props.topNewSnapshots.items.map(snapshot => (
          <InfoListItem
            listingId={snapshot.torrentInfo.torrentListing.id}
            listingName={snapshot.torrentInfo.torrentListing.name}
            seed={snapshot.seed}
            leach={snapshot.leach}
            uploadDate={snapshot.torrentInfo.uploadDate}
            uploader={snapshot.torrentInfo.uploadUser}
            groupsArr={snapshot.torrentInfo.Group}
            key={snapshot.id}
          />
        ))}
      </div>
    );
  }
}

const mapState = state => ({
  topNewSnapshots: state.stats.topNewSnapshots,
});

const mapDispatch = dispatch => ({
  load() {
    return dispatch(fetchTopNewSnapshots(1));
  },
});

export default connect(mapState, mapDispatch)(TopNewSnapshots);
