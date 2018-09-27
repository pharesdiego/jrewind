const path = require('path');

module.exports = {
  entry: './jrewind.js',
  target: 'web',
  output: {
    path: __dirname,
    filename: 'index.js',
    library: 'JRewind',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['babel-plugin-transform-class-properties', 'transform-es2015-destructuring', 'transform-object-rest-spread']
        }
      }
    ]
  }
}