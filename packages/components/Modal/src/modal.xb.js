/* eslint-disable */
const component = 'Modal'
const selector = 'body'

module.exports = {
  after (browser, done) {
    browser.end().perform(() => done())
  },

  'modal can be opened' (browser) {
    browser
      .loadStory({ story: 'Main Options', component, selector })
      .assert.visible(".open-modal")

    browser
      .waitForElementNotPresent('.ac-modal')
      .safeClick('.open-modal')
      .waitForElementPresent('.ac-modal')
  },

  'modal can be closed using the button' (browser) {
    browser
      .loadStory({ story: 'Main Options', component, selector })
      .safeClick('.open-modal')
      .pause(125)
      .safeClick('.ac-modal__close')
      .pause(125)
      .waitForElementNotPresent('.ac-modal')
  },

  'modal can be open + closed twice using the button and thus an ie11/iOS9 bug is fixed!' (browser) {
    browser
      .loadStory({ story: 'Main Options', component, selector })
      .safeClick('.open-modal')
      .pause(125)
      .safeClick('.ac-modal__close')
      .pause(125)
      .waitForElementNotPresent('.ac-modal')
      .pause(125)
      .safeClick('.open-modal')
      .pause(125)
      .waitForElementPresent('.ac-modal', 'Element should open')
      .pause(125)
      .waitForElementPresent('.ac-modal', 'Element should not have closed itself')
  },
}
