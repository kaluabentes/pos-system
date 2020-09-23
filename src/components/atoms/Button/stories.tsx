import React from 'react'
import { action } from '@storybook/addon-actions'

import Button from '.'

export default {
  title: 'Atoms/Button',
  component: Button
}

export const Default = (): JSX.Element => (
  <Button onClick={action('onClick')}>Default</Button>
)
