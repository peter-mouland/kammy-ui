const bodyParser = require('body-parser');

const fetchGoogleSpreadsheet = require("../../packages/server/fetch-google-sheets/src/index");

const jsonParser = bodyParser.json();

module.exports = (router) => {
  router.get('/google-spreadsheet/:spreadsheetId/:worksheetName', jsonParser, (req, res) => {
    const { spreadsheetId, worksheetName } = req.params;
    return fetchGoogleSpreadsheet({ spreadsheetId, worksheetName })
      .then((data) => res.json({ data }));
  });
};
