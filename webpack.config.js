const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const WebpackHtmlPlugin = require("html-webpack-plugin");
const dist = path.resolve(__dirname, "dist");
const crate = path.resolve(__dirname, "wasm");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: {
    index: "./src/main.tsx",
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
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      Wasm: path.join(crate, "pkg"),
    },
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: crate,
      outDir: path.join(crate, "pkg"),
    }),
    new WebpackHtmlPlugin({
      template: path.resolve(__dirname, "template.html"),
    }),
  ],
};
