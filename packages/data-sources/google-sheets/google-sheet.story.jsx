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
storiesOf('Data Sources/googleSheet', module)
  .add('Players', () => (
    <GetSheet
      spreadsheetId={text('spreadsheetId', '1x2qD0aS6W-MeARu6QT0YthgLV91-Hmlip5_Gut2nEBI')}
      worksheetName={text('worksheetName', 'Players')}
    />
  ))
  .add('Teams', () => (
    <GetSheet
      spreadsheetId={text('spreadsheetId', '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI')}
      worksheetName={text('worksheetName', 'Teams')}
    />
  ))
  .add('Transfers', () => (
    <GetSheet
      spreadsheetId={text('spreadsheetId', '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI')}
      worksheetName={text('worksheetName', 'Transfers')}
    />
  ))
  .add('GameWeeks', () => (
    <GetSheet
      spreadsheetId={text('spreadsheetId', '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI')}
      worksheetName={text('worksheetName', 'GameWeeks')}
    />
  ));
