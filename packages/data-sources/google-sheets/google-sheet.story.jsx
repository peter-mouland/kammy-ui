import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { getJSON } from '@kammy-ui/fetchr';

const createJsonObj = (item) => ({
  [item.player]: {
    new: item.new,
    code: item.code,
    pos: item.position,
    player: item.player,
    club: item.club,
  },
});

class GetSheet extends React.Component {
  state = {
    jsonData: {},
    error: null,
  };

  fetchSheet = async ({ spreadsheetId, worksheetName }) => {
    const { jsonData } = await getJSON(`/google-spreadsheet/${spreadsheetId}/${worksheetName}`);
    const data = Object.keys(jsonData).reduce((prev, key) => ({
      ...prev,
      ...createJsonObj(jsonData[key]),
    }), {});
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
storiesOf('Data Sources', module)
  .add('googleSheet', () => (
    <GetSheet
      spreadsheetId={text('spreadsheetId', '1x2qD0aS6W-MeARu6QT0YthgLV91-Hmlip5_Gut2nEBI')}
      worksheetName={text('worksheetName', 'Players')}
    />
  ));
