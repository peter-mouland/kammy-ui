import GoogleSpreadsheet from './GoogleSpreadsheet';
import GoogleSpreadsheetCred from './google-generated-creds.json';


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
