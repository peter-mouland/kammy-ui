/* eslint-disable max-len */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Svg, { SvgProvider } from './src/Svg';

const Wishlist = `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 30 30" class="icon icon--wishlist">
  <path class="icon__heart" d="M21.5,3.4c-2.8,0-5.3,1.6-6.5,4.1C13.8,5,11.2,3.4,8.5,3.4c-4,0-7.3,3.3-7.3,7.3c0,1.9,0.7,3.7,2.1,5.1
    C4.5,17,14.6,27.3,14.7,27.4c0.1,0.1,0.2,0.1,0.3,0.1h0c0.1,0,0.2,0,0.3-0.1c0.4-0.4,10.3-10.4,11.5-11.7c1.3-1.4,2-3.1,2-5
    C28.8,6.7,25.6,3.4,21.5,3.4z" /></svg>`;


storiesOf('Components/Svg', module)
  .add('Default', () => (
    <Svg height={'30px'} width={'30px'} >{Wishlist}</Svg>
  ))
  .add('Manual Re-use', () => (
    <div>
      <Svg id={'my-test'} symbol height={'30px'} width={'30px'} >{Wishlist}</Svg>
      <Svg use={'my-test'} />
      <Svg use={'my-test'} style={{ fill: 'green', stroke: 'red' }} />
    </div>
  ))
  .add('Auto Re-use', () => (
    <SvgProvider>
      <Svg cacheId={'wish-list'} height={'30px'} width={'30px'} >{Wishlist}</Svg>
      <Svg cacheId={'wish-list'} height={'30px'} width={'30px'} style={{ fill: 'green', stroke: 'red' }} >{Wishlist}</Svg>
    </SvgProvider>
  ));
