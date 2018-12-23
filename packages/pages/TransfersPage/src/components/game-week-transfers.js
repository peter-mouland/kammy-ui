import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import Interstitial from '@kammy-ui/interstitial';

const formatTimestamp = (ts) => format(ts, 'MMM Do, HH:mm:ss');

const getEmoji = (status = '') => {
  switch (status.toLowerCase()) {
  case 'tbc': return '&#129300;'; // thinking
  case 'e': return '&#129324;'; // angry
  case 'y': return '&#129303;'; // happy
  default: return '';
  }
};

const GameWeekTransfers = ({ transfers, isLoading }) => (
  <table className={'table'}>
    <thead>
      <tr className={'row'}>
        <th className={'cell'}>Timestamp</th>
        <th className={'cell'}>Status</th>
        <th className={'cell'}>Type</th>
        <th className={'cell'}>Manager</th>
        <th className={'cell'}>Transfer In</th>
        <th className={'cell'}>Transfer Out</th>
        <th className={'cell'}>Comment</th>
      </tr>
    </thead>
    <tbody>
      {transfers.map(({
        timestamp, status = '', type, manager: mgr, transferIn, transferOut, comment,
      }) => (
        <tr className={`row row--${status.toLowerCase()}`} key={timestamp}>
          <td className={'cell cell--status cell--center'} dangerouslySetInnerHTML={{ __html: `${status} ${getEmoji(status)}` }} />
          <td className={'cell cell--left'}>{formatTimestamp(timestamp)}</td>
          <td className={'cell cell--center'}>{type}</td>
          <td className={'cell cell--center'}>{mgr}</td>
          <td className={'cell cell--center'}>{transferIn}</td>
          <td className={'cell cell--center'}>{transferOut}</td>
          <td className={'cell cell--center'}>{comment}</td>
        </tr>
      ))}
      {transfers.length === 0 && !isLoading && (
        <tr className={'row'}>
          <td className={'cell cell--center'} colSpan={7}><em>no transfers have been requested</em></td>
        </tr>
      )}
    </tbody>
    <tfoot>
      <tr className={'row row--interstitial'}><td colSpan={7}>
        { (isLoading) && (
          <Interstitial message='loading transfers...' />
        ) }
      </td></tr>
    </tfoot>
  </table>
);

GameWeekTransfers.propTypes = {
  transfers: PropTypes.arrayOf(PropTypes.shape({
    timestamp: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    manager: PropTypes.string,
    transferIn: PropTypes.string,
    transferOut: PropTypes.string,
    comment: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool,
};

GameWeekTransfers.defaultProps = {
  isLoading: false,
};

export default GameWeekTransfers;
