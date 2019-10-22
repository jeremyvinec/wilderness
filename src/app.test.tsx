import 'react-native'
import * as renderer from 'react-test-renderer'
import { App } from './app'
import * as React from 'react'

test('renders correctly', () => {
  const tree = renderer.create(
    <App/>
  )
  expect(tree).toBeDefined()
})