const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const WebpackHtmlPlugin = require("html-webpack-plugin");
const dist = path.resolve(__dirname, "dist");
const crate = path.resolve(__dirname, "wasm");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/main.js"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      Wasm: path.join(crate, "pkg")
    }
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: crate,
      outDir: path.join(crate, "pkg")
    }),
    new WebpackHtmlPlugin({
      template: path.resolve(__dirname, "template.html")
    })
  ]
};
