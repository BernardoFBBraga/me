const path = require("path");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const distPath = path.resolve(__dirname, "dist");

const commonConfig = {
  output: {
    filename: "[name].bundle.js",
    clean: true,
  },
  entry: {
    shared: "./src/components/App.tsx",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-typescript", "@babel/env"] },
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
  resolve: { extensions: ["*", ".js", ".jsx", ".ts", ".tsx"] },
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
      import: "./src/entry-points/web.jsx",
      dependOn: "shared",
    },
  },
  plugins: [
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
      import: "./src/entry-points/static-render.jsx",
      dependOn: "shared",
    },
  },
};

const devServerConfig = {
  ...clientConfig,
  entry: {
    ...clientConfig.entry,
    web: {
      ...clientConfig.entry.web,
      import: "./src/entry-points/dev-server.jsx",
    },
  },
};

module.exports = [serverConfig, clientConfig, devServerConfig];
