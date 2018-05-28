/* eslint-disable */
import { createSelector } from 'reselect';
import TeamSeason from '@kammy-ui/data-team-season';

const getCurrentTeam = (state, manager) => {
  const { spreadsheet, players } = state;
  const { teams, transfers, gameWeeks } = spreadsheet;
  const team = new TeamSeason({
    team: teams[manager], transfers: transfers[manager], gameWeeks, players,
  });
};
