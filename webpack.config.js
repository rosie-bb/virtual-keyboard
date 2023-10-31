const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"), // 절대 경로를 찾을 수 있도록 넣어줘야함
    clean: true
  },
  devtool: "source-map", // 빌드한 파일과 원본파일을 연결시켜주는 역할
  mode: "development", // production mode도 있음, 난독화 기능을 제공하는지에 대한 차이가 있음
  devServer: {
    host: "localhost",
    port: 8080,
    open: true,
    watchFiles: "index.html" // index.html 변화가 있을때마다 리로드
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard",
      template: "./index.html",
      inject: "body", // 번들 시 js파일이 body 태그 다음에 오도록 설정, 안하면 head에 들어가게됨
      favicon: "./favicon.ico"
    }),
    new MiniCssExtractPlugin({ filename: "style.css" })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new CssMinimizerWebpackPlugin()
    ]
  }
}