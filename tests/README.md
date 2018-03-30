# Testing

 > Unit and cross-browser (xb) tests

## Unit Testing

 > Test isolated functions/files, focusing on api input vs output rather than implementation.

`npm run test:unit`

You can find all the `*.spec.js` test file sitting next to the file they test.
This way it is very quick and simple to see documentation on how to use a function.
It is also very easy to see if any files are _missing_ tests

## Regression Testing

 > Take screenshots of each component on multiple _real_ browsers,

 * `npm run test:xb` (for local testing on Chrome only)
 * `npm run test:xb-all` (multiple browsers for remote testing)

**Keep the screenshots small**. Full page screenshots will fail with _every_ new feature.  This will cause frustraition and lead to failing tests to be ignored.  Cutting the page up into _components_ will ensure that failing tests are meaningful.

If browserstack-local crashes without stopping you may need to find its process and kill it
  * `lsof -i tcp:45691`
