const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    library: {
        name: "YoutubeEmbed",
        type: 'umd',
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-inline-loader",
            options: {
              removeSVGTagAttrs: false
            }
          }
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
};
