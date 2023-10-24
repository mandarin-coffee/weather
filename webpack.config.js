const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./public/scripts/index.ts",
    resolve: {
      extensions: [".js", ".ts"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "js/[name]-[chunkhash].js",
      clean: true,
      publicPath: "/",
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "404.html",
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name]-[hash].css",
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development",
        ),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(?:js|mjs|cjs|ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            // options: {
            //   presets: ["@babel/preset-env"],
            // },
          },
        },
        {
          test: /\.css|\.scss$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(png|jpg|gif)/,
          type: "asset/resource",
          generator: {
            filename: "images/[name][ext][query]",
          },
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
      ],
    },
    devtool:
      process.env.NODE_ENV === "production" ? "source-map" : "eval-source-map",
    devServer: {
      // static: {
      //   directory: path.join(__dirname, 'public'),
      // },
      watchFiles: "public/*",
      compress: true,
      port: 9000,
      historyApiFallback: true,
    },
    optimization: {
      minimizer: [
        // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
        "...",
        new CssMinimizerPlugin(),
      ],
    },
  };
};
