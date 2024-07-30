const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  mode: process.env.NODE_ENV || 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'MyLibrary',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          /example/,
        ]
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/,
          /example/,
        ]
      },
    ],
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
};
