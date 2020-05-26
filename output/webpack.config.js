const path = require("path");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const WebpackHtmlPlugin = require("html-webpack-plugin");

const dist = path.resolve(__dirname, "..", "dist"); 
const crate = path.resolve(__dirname, "core");

module.exports = {
  mode: "development",             
  devtool: "source-map",
  entry: { 
    index: "./main.js"
  },
  output: {
    path: dist,
    filename: "[name].js"
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: crate,
    }),
    new WebpackHtmlPlugin({
      template: path.resolve(__dirname, "..", "template.html")
    })
  ]
};

                                                                                        
