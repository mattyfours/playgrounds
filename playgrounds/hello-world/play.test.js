import { expect, test } from 'vitest'
import playFunction from './play.js'

test('Returns the message from the .env file', async () => {
  const result = await playFunction()
  expect(result).toBe('hello world')
})
