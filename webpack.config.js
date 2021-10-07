const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const distPath = path.resolve(__dirname, "dist");

const commonConfig = {
  output: {
    filename: "[name].bundle.js",
    clean: true,
  },
  entry:{
    shared: "./src/components/App.jsx",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

const clientConfig = {
  ...commonConfig,
  output: {
    ...commonConfig.output,
    path: `${distPath}/web`,
  },
  entry: {
    ...commonConfig.entry,
    web: {
      import: "./src/web.jsx",
      dependOn: "shared",
    },
  },
  devServer: {
    static: "./dist",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Bernardo Braga",
    }),
//    new BundleAnalyzerPlugin(),
  ],
};

const serverConfig = {
  ...commonConfig,
  target: "node",
  output: {
    ...commonConfig.output,
    path: `${distPath}/server`,
  },
  entry: {
    ...commonConfig.entry,
    static_render: {
      import: "./src/static-render.jsx",
      dependOn: "shared",
    },
  },
  plugins: [
//    new BundleAnalyzerPlugin(),
  ],
};

module.exports = [serverConfig, clientConfig];
