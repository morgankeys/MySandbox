const path = require('path');

module.exports = {
  entry: './scripts/main.js',   // The entry point of your application
  output: {
    filename: 'bundle.js',   // The output file
    path: path.resolve(__dirname, 'dist'),   // Output directory
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,      // Rule to handle CSS files
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};