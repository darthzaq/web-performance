const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Package to open
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { GenerateSW } = require("workbox-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [new GenerateSW(), new MiniCssExtractPlugin(), new BundleAnalyzerPlugin()],
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
