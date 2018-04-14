import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@kammy/modal';
import Interstitial from '@kammy/interstitial';
import ClubFixturesTable from './ClubFixtures.table';

class ClubFixturesModal extends React.Component {
  static propTypes = {
    fetchPlayerFixtures: PropTypes.func,
    onClose: PropTypes.func,
    player: PropTypes.object,
    showFixtures: PropTypes.string,
  };

  static defaultProps = {
    fetchPlayerFixtures: () => {},
    onClose: () => {},
    showFixtures: null,
    player: null,
  };

  componentDidMount() {
    const { showFixtures, player, fetchPlayerFixtures } = this.props;
    if (!player || !player[showFixtures]) {
      fetchPlayerFixtures({ code: showFixtures });
    }
  }

  render() {
    const { player, onClose, showFixtures } = this.props;
    if (!showFixtures) return null;

    const details = player ? player[showFixtures] : false;
    return (showFixtures && !details)
      ? (
        <Modal
          id={'loading'}
          open={!!showFixtures}
          className="home-or-away"
          onClose={onClose}
          title={'Loading Player Fixtures'}
        >
          <Interstitial>Loading Player Fixtures</Interstitial>
        </Modal>
      )
      : (
        <Modal
          key={`${details.code}-fixtures`}
          id={`${details.code}-fixtures`}
          title={<span>{details.name} <small>{details.club}</small></span>}
          open={!!showFixtures}
          onClose={onClose}
        >
          <ClubFixturesTable fixtures={details.fixtures} club={details.club} code={details.code} />
        </Modal>
      );
  }
}

export default ClubFixturesModal;
