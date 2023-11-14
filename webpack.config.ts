import path from 'path';
import webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import dev from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode;
  port: number;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',

    //example of many different entrypoints
    // entry: {
    //   helloWorld: path.resolve(__dirname, 'src', 'index.js'),
    //   helloWorld2: path.resolve(__dirname, 'src', 'index2.js'),
    // },

    // old entry point for js style
    // entry: path.resolve(__dirname, 'src', 'index.js'),

    // new entry point for TS style
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    module: {
      rules: [
        {
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
    devServer: {
      port: env.port ?? 5001,
      open: true,
      static: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
  };
  return config;
};
