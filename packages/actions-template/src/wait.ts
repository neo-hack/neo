export default function wait(milliseconds: number | string) {
  return new Promise((resolve) => {
    if (typeof milliseconds !== 'number') {
      throw new TypeError('milliseconds not a number')
    }
    setTimeout(() => resolve('done!'), milliseconds)
  })
}
