const bodyParser = require('body-parser');

const { default: fetchGoogleSpreadsheet } = require("../../packages/server/fetch-kammy-gsheet/dist/index.min");

const jsonParser = bodyParser.json();

module.exports = (router) => {
  router.get('/google-spreadsheet/:spreadsheetId/:worksheetName', jsonParser, (req, res) => {
    const { spreadsheetId, worksheetName } = req.params;
    return fetchGoogleSpreadsheet({ spreadsheetId, worksheetName })
      .then((data) => res.json({ data }));
  });
};
