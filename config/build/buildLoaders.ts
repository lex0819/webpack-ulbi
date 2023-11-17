import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/types';

export function buildLoader(options: BuildOptions): ModuleOptions['rules'] {
  options.mode = options.mode ?? 'development';

  const isDev = options.mode === 'development';

  const cssLoadersWithModules = {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      //use MiniCssExtractPlugin instead style-loader
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoadersWithModules,
      // Compiles Sass to CSS
      'sass-loader',
    ],
  };

  const tsLoader = {
    // ts-laoder умеет работать с JSX из коробки
    //если бы использовали не ts, a js - был бы нужен еще babel-loader
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  return [
    //порядок правил имеет значение!
    scssLoader,
    tsLoader,
  ];
}
