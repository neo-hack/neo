const proxy = {
  'GET /fake': {
    data: Array(10)
      .fill(0)
      .map((_v, i) => i),
  },
}

export default proxy
