import wait from '../src/wait'

test('throws invalid number', async () => {
  await expect(wait('foo')).rejects.toThrow('milliseconds not a number')
})

test('wait 500 ms', async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  const delta = Math.abs(end.valueOf() - start.valueOf())
  expect(delta).toBeGreaterThanOrEqual(500)
})
