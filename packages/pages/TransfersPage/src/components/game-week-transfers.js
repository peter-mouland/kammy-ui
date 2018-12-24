import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import sortBy from '@kammy-ui/sort-columns';
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

const TransferBody = ({ transfers }) => transfers.length > 0 && (
  <tbody>
    {transfers
      .sort(sortBy(['status', 'timestamp']))
      .map(({
        timestamp, status = '', type, manager: mgr, transferIn, transferOut, comment,
      }) => (
        <tr className={`row row--${status.toLowerCase()}`} key={timestamp}>
          <td data-col-label='status' className={'cell cell--status cell--show-750 cell--center'} dangerouslySetInnerHTML={{ __html: `${status} ${getEmoji(status)}` }} />
          <td data-col-label='timestamp' className={'cell cell--left cell--show-625'}>{formatTimestamp(timestamp)}</td>
          <td data-col-label='type' className={'cell cell--center'}>{type}</td>
          <td data-col-label='manager' className={'cell cell--center'}>{mgr}</td>
          <td data-col-label='transfer in' className={'cell cell--center'}>{transferIn}</td>
          <td data-col-label='transfer out' className={'cell cell--center'}>{transferOut}</td>
          <td data-col-label='comment' className={'cell cell--center cell--show-925 '}>{comment}</td>
        </tr>
      ))}
  </tbody>
);

const GameWeekTransfers = ({ transfers, isLoading }) => (
  <table className={'table'}>
    <thead>
      <tr className={'row'}>
        <th className={'cell cell--show-750'}>Status</th>
        <th className={'cell cell--show-625'}>Timestamp</th>
        <th className={'cell'}>Type</th>
        <th className={'cell'}>Manager</th>
        <th className={'cell'}>In</th>
        <th className={'cell'}>Out</th>
        <th className={'cell cell--show-925'}>Comment</th>
      </tr>
    </thead>
    <TransferBody transfers={transfers} />
    {transfers.length === 0 && !isLoading && (
      <tbody>
        <tr className={'row'}>
          <td className={'cell cell--center'} colSpan={7}><em>no transfers have been requested</em></td>
        </tr>
      </tbody>
    )}
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
