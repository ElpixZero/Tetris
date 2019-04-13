let path = require('path');


let config = {
  entry: './src/js/entry.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
    publicPath: 'dist/'
  },
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devtool: 'eval-sourcemap'
};

module.exports = (env, options) => {
  let production = options.mode === "production";

  config.devtool = production ? false : 'eval-sourcemap'
  return config;
}