const path = require('path');
function resolveSrc(_path) {
  return path.join(__dirname, _path)
}
module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        'src': resolveSrc('src')
      },
      baseUrl: process.env.NODE_ENV === 'production'
        ? '/public/' : '/'
    }
  },
  devServer: {
    https: false,
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    open: false,
    overlay: { warnings: false, errors: true },
    watchOptions: {
      poll: 1000,
      aggregateTimeout: 300,
    }
  }
};
