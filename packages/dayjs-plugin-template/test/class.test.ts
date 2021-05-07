import Hello from '../src/index'
import dayjs from 'dayjs'

dayjs.extend(Hello)

describe('dayjs plugin', () => {
  it('hello world', () => {
    dayjs.hello({ word: 'world' }).say()
  })
})
