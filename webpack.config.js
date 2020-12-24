
const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  entry: ['./assets/scss/style.scss','./assets/js/app.js'],
  output: {
    path: path.resolve(__dirname, '_includes/assets'),
    filename: 'bundle.js',
    publicPath: '',
  },
  watch: (process.argv.indexOf('--watch') > -1),
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'bundle.css',
            },
          },
          { loader: 'extract-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              webpackImporter: false,
              implementation: require('sass'),
              sassOptions: {
                includePaths: ['./node_modules']
              },
            }
          },
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      }
    ]
  },
};
