import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { fetchSpreadsheet } from '@kammy-ui/fetchr';

class GetSheet extends React.Component {
  state = {
    jsonData: {},
    error: null,
  };

  fetchSheet = async ({ spreadsheetId, worksheetName }) => {
    const { data } = await fetchSpreadsheet(spreadsheetId, worksheetName);
    this.setState({ jsonData: data });
  };

  render() {
    const { jsonData } = this.state;
    return (
      <div>
        <button onClick={() => this.fetchSheet(this.props)}>Fetch Google Spreadsheet</button>
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
storiesOf('Data Sources/fetch-google-sheets', module)
  .add('Players', () => (
    <GetSheet
      worksheetName={text('worksheetName', 'Players')}
    />
  ))
  .add('Premier League Teams', () => (
    <GetSheet
      worksheetName={text('worksheetName', 'premierLeague')}
    />
  ))
  .add('Championship Teams', () => (
    <GetSheet
      worksheetName={text('worksheetName', 'championship')}
    />
  ))
  .add('League One Teams', () => (
    <GetSheet
      worksheetName={text('worksheetName', 'leagueOne')}
    />
  ))
  .add('Transfers', () => (
    <GetSheet
      worksheetName={text('worksheetName', 'Transfers')}
    />
  ))
  .add('GameWeeks', () => (
    <GetSheet
      worksheetName={text('worksheetName', 'GameWeeks')}
    />
  ))
  .add('custom', () => (
    <GetSheet
      spreadsheetId={text('spreadsheetId', '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI')}
      worksheetName={text('worksheetName', 'GameWeeks')}
    />
  ));
