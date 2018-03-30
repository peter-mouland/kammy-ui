const assert = require('assert')
const loadStoryBook = require('./loadStoryBook')

const mockKnob = {
  colorVariants: [
    {
      variantLabel: 'grey',
      name: 'Pokemon Blue Print T-Shirt - grey',
      productId: '6981745'
    },
    {
      variantLabel: 'black',
      name: 'Pokemon Blue Print T-Shirt - black',
      productId: '6981746'
    }
  ]
}

const mockResult = 'knob-colorVariants=%5B%7B%22variantLabel%22%3A%22grey%22%2C%22name%22%3A%22Pokemon%20Blue%20Print%20T-Shirt%20-%20grey%22%2C%22productId%22%3A%226981745%22%7D%2C%7B%22variantLabel%22%3A%22black%22%2C%22name%22%3A%22Pokemon%20Blue%20Print%20T-Shirt%20-%20black%22%2C%22productId%22%3A%226981746%22%7D%5D'
assert.ok(loadStoryBook.prototype.parseKnobs(mockKnob) === mockResult)
