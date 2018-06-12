const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const __root = path.resolve(__dirname, '..');

module.exports = {
  entry: path.join(__root, 'src/docs'),
  output: {
    path: path.join(__root, 'docs'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__root, 'src/docs/index.html'),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__root, 'docs'),
    port: 8000,
    stats: 'minimal',
    historyApiFallback: true,
  },
};
