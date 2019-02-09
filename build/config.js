var common = {
  staticFolder: 'static',
}

module.exports = {
  dev: {
    staticFolder: common.staticFolder,
    mode: 'development',
  },
  prod: {
    staticFolder: common.staticFolder,
    mode: 'production',
  },
}
