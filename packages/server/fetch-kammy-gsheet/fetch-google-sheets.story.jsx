import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import fetch from './src/index';

class GetSheet extends React.Component {
  state = {
    jsonData: {},
    error: null,
  };

  fetchSheet = async ({ type, division }) => {
    const data = await fetch[type](division);
    this.setState({ jsonData: data });
  };

  render() {
    const { jsonData } = this.state;
    return (
      <div>
        <button onClick={() => this.fetchSheet(this.props)}>Fetch Spreadsheet</button>
        <pre>
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      </div>
    );
  }
}

/**
 * STORIES
 */
storiesOf('Data Sources/fetch-kammy-sheets', module)
  .add('GameWeeks', () => (
    <GetSheet
      type={text('type', 'gameWeeks')}
    />
  ))
  .add('Division List', () => (
    <GetSheet
      type={text('type', 'divisionList')}
    />
  ))
  .add('Division Players', () => (
    <GetSheet
      type={text('type', 'divisionsPlayers')}
    />
  ))
  .add('Players', () => (
    <GetSheet
      type={text('type', 'players')}
    />
  ))
  .add('Draft: Premier League', () => (
    <GetSheet
      type={text('type', 'draft')}
      division={text('division', 'premierLeague')}
    />
  ))
  .add('Draft: Championship', () => (
    <GetSheet
      type={text('type', 'draft')}
      division={text('division', 'championship')}
    />
  ))
  .add('Draft: League One', () => (
    <GetSheet
      type={text('type', 'draft')}
      division={text('division', 'leagueOne')}
    />
  ))
  .add('Transfers: premierLeague', () => (
    <GetSheet
      type={text('type', 'transfers')}
      division={text('division', 'premierLeague')}
    />
  ))
  .add('Transfers: championship', () => (
    <GetSheet
      type={text('type', 'transfers')}
      division={text('division', 'championship')}
    />
  ))
  .add('Transfers: leagueOne', () => (
    <GetSheet
      type={text('type', 'transfers')}
      division={text('division', 'leagueOne')}
    />
  ));
