import path from 'path';
import webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import dev from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  env.mode = env.mode ?? 'development';
  const isDev = env.mode === 'development';

  const config: webpack.Configuration = {
    mode: env.mode,

    //example of many different entrypoints
    // entry: {
    //   helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //   helloWorld2: path.resolve(__dirname, 'src', 'index2.js'),
    // },

    // old entry point for js style
    // entry: path.resolve(__dirname, 'src', 'index.js'),

    // new entry point for TS style

    // new entrypoint for react style
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    module: {
      rules: [
        //порядок правил имеет значение!
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            //use MiniCssExtractPlugin instead style-loader
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
        {
          // ts-laoder умеет работать с JSX из коробки
          //если бы использовали не ts, a js - был бы нужен еще babel-loader
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev
      ? {
          port: env.port ?? 5001,
          open: true,
          static: path.resolve(__dirname, 'dist'),
        }
      : undefined,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      isDev && new webpack.ProgressPlugin(),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: 'css/[name].[contenthash:8].css',
          chunkFilename: 'css/[name].[contenthash:8].css',
        }),
    ].filter(Boolean), // filter runs only true plugins
  };
  return config;
};
