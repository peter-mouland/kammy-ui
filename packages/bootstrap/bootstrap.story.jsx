import React from 'react'
import { storiesOf } from '@storybook/react'
import Colors from './stories/Colors.story'
import Layout from './stories/Layout.story'

const stories = storiesOf('Bootstrap', module)

stories.add('Compliant Colors', () => (
  <Colors />
))

stories.add('Component Layout (New!)', () => (
  <Layout />
))
