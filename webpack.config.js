
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = [{
  entry: './assets/scss/style.scss',
  output: {
    path: path.resolve(__dirname, '_includes/css'),
    // This is necessary for webpack to compile
    // But we never use style-bundle.js
    filename: 'style.js',
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'style.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          },
        ]
      }
    ]
  },
}];