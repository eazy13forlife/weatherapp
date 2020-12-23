const pathObject = require("path");

module.exports = {
  entry: ["core-js/stable", "regenerator-runtime/runtime", "./source/index.js"],
  output: {
    path: pathObject.resolve(__dirname, "./public/scripts"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"],
              plugins: ["transform-object-rest-spread"],
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "../../public/scripts/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: pathObject.resolve(__dirname, "./public"),
    publicPath: "./scripts",
  },
  devtool: "source-map",
};
