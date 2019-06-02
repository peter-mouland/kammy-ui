import GoogleSpreadsheet from './GoogleSpreadsheet';
import GoogleSpreadsheetCred from './google-generated-creds.json';

export const spreadsheets = {
  DRAFTFF_TRANSFERS_ID: '10xathUydH-GDTLjngRXioaUVqBZoiZqfjfM6fhgUcYk',
  DRAFTFF_DRAFT_ID: '1gVEHnzHPfSR7isLNfxJxq8DKKLY4mKeiffwUb7YfFlc',
  DRAFTFF_SETUP_ID: '1HoInFwqCFLSl0yh8JBvQEFFjOg5ImiiT-BY_aDCy0AU',
  KAMMY_ID: '1kX5RFsMnnPknkTu4BzJmqJ-KojWfIkS2beg9RaAeSOI',
};

export const saveRow = ({ spreadsheetId, worksheetName, data }) => (
  new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
    .getWorksheet(worksheetName)
    .addRows([data])
);

export const saveRows = ({ spreadsheetId, worksheetName, data }) => (
  new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
    .getWorksheet(worksheetName)
    .addRows(data)
);
