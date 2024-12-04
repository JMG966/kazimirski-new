module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
  },
  module: {
      rules: [
          {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-react', '@babel/preset-env']
                  }
              }
          },
          {
              test: /\.css$/,
              use: [
                  'style-loader',
                  {
                      loader: 'css-loader',
                      options: {
                          modules: true
                      }
                  }
              ]
          }
      ]
  }
};
