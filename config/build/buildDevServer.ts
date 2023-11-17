import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { BuildOptions } from './types/types';

export function buildDevServer({ port }: BuildOptions): DevServerConfiguration {
  return {
    port: port ?? 5001,
    open: true,
    // если раздавать статику через nginx, то надо делать проксирование на index.html
    historyApiFallback: true,
  };
}
