import React from 'react';
import PropTypes from 'prop-types';
import DivisionStats from '@kammy-ui/division-stats';

const Teams = ({ divisionId, label }) => (
  <DivisionStats label={label} divisionId={divisionId} />
);

Teams.propTypes = {
  divisionId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Teams;
