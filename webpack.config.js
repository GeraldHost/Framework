const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const WebpackHtmlPlugin = require("html-webpack-plugin");

const dist = path.resolve(__dirname, "dist");
const crate = path.resolve(__dirname, "core");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./main.ts",
  },
  output: {
    path: dist,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: crate,
      outDir: path.resolve(crate, "pkg"),
    }),
    new WebpackHtmlPlugin({
      template: path.resolve(__dirname, "template.html"),
    }),
  ],
};

