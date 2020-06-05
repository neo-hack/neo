module.exports = {
  workerpool: {
    workers: require('os').cpus().length - 1,
    poolTimeout: process.env.NODE_ENV === 'development' ? Infinity : 2000,
  },
}
