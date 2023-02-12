const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Package to open
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { GenerateSW } = require("workbox-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require("./webpack.common.js");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const path = require('path');

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new PurgecssPlugin({
      paths: ["index.html"],
    }),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, "dist"),
      src: "index.html",
      dest: "index.html",
      inline: true,
      minify: true,
      extract: true,
      dimensions: [
        {
          width: 375,
          height: 565,
        },
        {
          width: 1100,
          height: 700,
        },
      ],
      penthouse: {
        blockJSRequests: false,
      },
    }),
    new GenerateSW(),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
  performance: {
    hints: "error"
  },
});
