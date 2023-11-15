import webpack from 'webpack';
import { buildLoader } from './buildLoaders';
import { buildDevServer } from './buildDevServer';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;

  const isDev = mode === 'development';

  return {
    mode: mode,
    entry: paths.entry,
    module: {
      rules: buildLoader(options),
    },
    resolve: buildResolvers(options),
    output: {
      filename: '[name].[contenthash].js',
      path: paths.output,
      clean: true,
    },
    devtool: isDev && 'inline-source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
  };
}
