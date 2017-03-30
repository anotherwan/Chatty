var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var wpconfig = require('./webpack.config');
var config = require('./config');
let PORT = process.env.PORT || 3000;

new WebpackDevServer(webpack(wpconfig), {
    publicPath: wpconfig.output.publicPath,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  })

  .listen(PORT, function (err, result) {
  // .listen(process.env.PORT || 3000, function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log(`Running at http://0.0.0.0:${PORT}`);
  });
