const bodyParser = require('body-parser');

const GoogleSpreadsheet = require("../../packages/data-sources/google-sheets/src/index");
const GoogleSpreadsheetCred = require("../../packages/data-sources/google-sheets/src/google-generated-creds.json");
const jsonParser = bodyParser.json();

module.exports = (router) => {
  router.get('/google-spreadsheet/:spreadsheetId/:worksheetName', jsonParser, (req, res) => {
    const { spreadsheetId, worksheetName } = req.params;
    // for authorising a new sheet look: https://www.npmjs.com/package/google-spreadsheet
    // probably easiest to make the sheet public
    new GoogleSpreadsheet(spreadsheetId, GoogleSpreadsheetCred)
      .getWorksheet(worksheetName)
      .toJson((item) => {
        delete item._links;
        delete item._xml;
        return ({ [item.id]: item });
      })
      .then((data) => res.json({ data }));
  });
};
