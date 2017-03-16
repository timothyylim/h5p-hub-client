var webpack = require('webpack');
var path = require('path');
var isDevMode = JSON.parse(process.env.DEV_ENV || 0) == 1;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "h5p-hub-client.css"
});

const config = {
  entry: "./src/entries/dist.js",
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "h5p-hub-client.js",
    sourceMapFilename: '[file].map'
  },
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
      path.resolve('./node_modules/h5p-sdk/src/scripts')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader?sourceMap"
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
            }
          ],

          fallback: "style-loader"
        })
      },
      {
        test: /\.(svg)$/,
        include: path.join(__dirname, 'src/images'),
        loader: 'url-loader?limit=10000'
      } // inline base64 URLs for <=10k images, direct URLs for the rest
    ]
  },
  plugins: [
    extractSass
  ]
};

if (!isDevMode) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

module.exports = config;
