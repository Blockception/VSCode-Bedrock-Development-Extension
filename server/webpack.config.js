//@ts-check

"use strict";

const path = require("path");

/**@type {import('webpack').Configuration}*/
console.log("webpack: " + __dirname);
const config = {
  optimization: {
    mergeDuplicateChunks: true,
    minimize: true,
    mangleExports: true,
    mangleWasmImports: true,
    removeEmptyChunks: true,
    concatenateModules: true,
    usedExports: true,
    moduleIds:'size',
    chunkIds:'size',
    innerGraph: true,
  },
  performance: {
    hints: "warning",
    maxAssetSize: 500000000,
    maxEntrypointSize: 500000000,
  },

  target: "node", // vscode extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
  mode: "production",

  entry: "./server/src/server.ts", // the entry point of this extension, 📖 -> https://webpack.js.org/configuration/entry-context/
  output: {
    // the bundle is stored in the 'out' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, "out"),
    filename: "server.js",
    libraryTarget: "commonjs2",
    devtoolModuleFilenameTemplate: "../[resource-path]",
  },
  devtool: "source-map",
  externals: {
    vscode: "commonjs vscode", // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      { test: /\.ts$/, exclude: /node_modules/, use: [{ loader: "ts-loader" }] },
      { test: /\.json$/, exclude: /node_modules/, loader: "json-loader", type: "javascript/auto" },
    ],
  },
};
module.exports = config;
