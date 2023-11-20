# Webpack course

https://www.youtube.com/watch?v=acAH2_YT6bs&t=76s

## CommonJS

requare('./path') method is older case of NodeJS.
It works without Webpack.
requare() method is in PHP too and it link another librory from file too.

```js
const module_name = requare('./path/module_name');
```

## ES modules

import method is youngest case of ECMAScript2015.
It doesn't work in native NodeJS and browsers.
It needs Webpack.

```js
import { object_name } from './path/module_name';
```

## How to install webpack for the course?

```shell
npm i -D webpack@5.88.2 webpack-cli@5.1.4 webpack-dev-server@4.15.1
```

it add to package.json

```json
"devDependencies": {
    "webpack": "^5.88.2",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
```

Also we need to add build command in scripts's part like this.

```json
"scripts": {
    "build": "webpack",
  },
```

That command

```shell
npm run build
```

can create a **bundle** from all our js-files.

If you change script command's name, we need starting it true.
For example

```json
"scripts": {
    "build:dev": "webpack --env mode=development",
  },
```

That command

```shell
npm run build:dev
```

## include plagins

Webdev has a lot of plagins which including as commonJS like requare().

All webpack's settings must be in webpack.config.js file.

```js
const path = require('path'); //add path plugin
const HtmlWebpackPlugin = require('html-webpack-plugin'); //add html plugin
```

## loaders

Для работы с любыми файлами, отличными от JS, надо ставить лоадеры.
Лоалеры есть для всего - scss, png, ts - и т.д. и т.п.
Важен порядок обработки кода в цепочке. Читать цепочку надо задом наперед.
Если два раза обработать код например ts-loader-ом, - можно получить нечто странное!

### install ts loader

```shell
npm i -D typescript@5.2.2 ts-loader@9.5.0
```

dev in package.json

```json
"ts-loader": "^9.5.0",
"typescript": "^5.2.2",
```

create tsconfig.json file. Give it from
https://webpack.js.org/guides/typescript/#basic-setup

add some rows to webpack.config.js about module and resolve.

```js
module: {
    rules: [ //it contains rules of loaders
      {
        test: /\.tsx?$/, //regexp is which files will be processed
        use: 'ts-loader', //which loader will be used
        exclude: /node_modules/, //What do we miss? we don't process it
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
```

## Setup Webpack with typescript

install devDependencies

```shell
npm i -D @types/node@20.8.3 @types/webpack@5.28.3 ts-node@10.9.1 @types/webpack-dev-server@4.7.2
```

See all settings on "configuration webpack typescript".
https://webpack.js.org/configuration/configuration-languages/

## dev-server

https://webpack.js.org/guides/development/

Using webpack-dev-server

```shell
npm i -D webpack-dev-server@4.15.1
```

There are two rows in package.json about it in "devDependencies":

```json
"webpack-dev-server": "^4.15.1",
"@types/webpack-dev-server": "^4.7.2",
```

We can setup port for dev-server in webpack.config.ts or in package.json
We must setup default port in webpack.config.ts!
And we can change default to custom in package.json or in terminal.

On macOS often occupated 5000 and 7000 ports.
This happens because Control Center on Monterey listening to port 5000 and port 7000.

For fixing this you need to turn off System Settings > General > AirDrop & Handoff > AirPlay Receiver.

If package.json doesn't contain any settings about port, port be pulled from the webpack.config.ts.
Also we can write port in terminal like this

```shell
npm run start -- --env port=3333
```

## Using source maps

https://webpack.js.org/guides/development/#using-source-maps

Add source maps setup in webpack.config.ts for improve your expiriens.
Before devServer: section.

```js
devtool: 'inline-source-map',
```

If we add **isDev** parametr in file webpack.config.ts, we can manage between two operating modes - prod or dev.

```js
devtool: isDev && 'inline-source-map',
```

## install React + typescript

react is installed as production
ts for react is installed only dev dependencies.

```shell
npm i react@18.2.0 react-dom@18.2.0
npm i -D @types/react@18.2.25 @types/react-dom@18.2.11
```

We need to add row in tsconfig.json file

```json
"jsx": "react-jsx",
```

because without this our index.tsx is fall out error.
Either we must change the tsconfig.json or import react in all our .ts and tsx files.

## install css styles

https://webpack.js.org/loaders/css-loader/#root

Install css-loader for webpack

```shell
npm install --save-dev css-loader@6.8.1
```

Then add rule of css-loader to webpack.config.js

```js
{
  test: /\.css$/i,
  use: ["style-loader", "css-loader"],
},
```

Порядок правил ОЧЕНЬ ВАЖЕН!!!!

Also we need to install style-loader

```shell
npm i -D style-loader@3.3.3
```

### scss will be processed too.

https://webpack.js.org/loaders/sass-loader/#root

Install sass-loader too for processing scss files.

```shell
npm i -D sass@1.69.0 sass-loader@13.3.2
```

And then we need replace only css rule with sass rule in webpack.config.js. Because it includes all css + sass + scss.

```js
{
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    'style-loader',
    // Translates CSS into CommonJS
    'css-loader',
    // Compiles Sass to CSS
    'sass-loader',
  ],
},
```

### divide css and js code.

We want to get different files for js and css.
We don't wont to pack css+jss in one big file.

https://webpack.js.org/plugins/mini-css-extract-plugin/#root

Install mini-css-extract-plugin

```shell
npm i -D mini-css-extract-plugin@2.7.6
```

Add this object in plugins section of webpack

```js
new MiniCssExtractPlugin({
  filename: 'css/[name].[contenthash:8].css',
  chunkFilename: 'css/[name].[contenthash:8].css',
}),
```

Add MiniCssExtractPlugin.loader instead 'style-loader' in rule section of webpack.config.js

```js
{
  test: /\.s[ac]ss$/i,
  use: [
    // Creates `style` nodes from JS strings
    //use MiniCssExtractPlugin instead style-loader
    MiniCssExtractPlugin.loader,
    // Translates CSS into CommonJS
    'css-loader',
    // Compiles Sass to CSS
    'sass-loader',
  ],
},
```

## Style isolation. Css modules

For good name spacing in many style's files we can use module css.

there were App.scss file
We have changed it to App.module.scss file.

And now all selectors in App.scss have became uniq.

Easy fix is to create global definition (eg. file called **global.d.ts** in your source root) for importing CSS Modules or SCSS Modules:

```js
declare module "*.module.scss" {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}
```

We need import styles from module like this

```js
import styles from './App.module.scss';
```

Also we need setup **css-loader** for module's work in the webpack.config.js file.
webpack was divided by many modules.
Loaders are in ./config/build/buildLoaders.ts file.
Add there from document https://webpack.js.org/loaders/css-loader/#modules

```js
test: /\.css$/i,
loader: "css-loader",
options: {
  modules: {
    localIdentName: string,
    },
},
```

It is converted inside the file **buildLoaders.ts** as

```js
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
```

## routing

install react-router-dom

```shell
npm i -D react-router-dom@6.16.0
```

Docs are in https://reactrouter.com/en/main/start/tutorial

import react-router to main js entry point.
And add come code to it.

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <h1>about</h1>,
      },
      {
        path: '/shop',
        element: <h1>shop</h1>,
      },
    ],
  },
]);
const container = createRoot(root);

container.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

We have wrapped our component <App/> to router

### <Outlet/>

This component from router library we need add to main component for show our router's link.

```js

```

### historyApiFallback

Aslo we need to add one row for dev-server that routing runs on dev mode.
Let's go to file buildDevServer.ts and add there

```js
historyApiFallback: true,
```

## pages

We create some pages in pages folder.
We can create lazy component too.

### lazy pages

```js
import { lazy } from 'react';

export const lazyAbout = lazy(() => import('./About'));
```

For example - we made two files - About.tsx and his lazy version About.lazy.tsx

сам роутинг пишем в индекс файле

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/shop',
        element: (
          <Suspense>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]);
```

и оборачиваем компоненты страниц с ленивой загрузкой в <Suspense>! иначе не работает!

## chunk

после применения ленивой загрузки страниц вебпак сделает сборку для прод из нескольких чанков - по страницам.
Это сильно уменьшит размер мейн бандла и отдаст пользователю только нужное.

Следить за чанками и управлять ими можно инструментом

## webpack-bundle-analyzer

Docs are here https://github.com/webpack-contrib/webpack-bundle-analyzer
Usage (as a plugin) by CommonJS style. It doesn't support ES_modules style with import.

```js
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
```

The tool is just plugin and it must be add to plugin section

Or we must install @types/webpack-bundle-analyzer yet. Than import will be run good.

```shell
npm i -D webpack-bundle-analyzer@4.9.1 @types/webpack-bundle-analyzer
```

Add in types of mode

```js
analyzer?: boolean;
```

Then add in buildPlugins

```js
if (analyzer) {
  plugins.push(new BundleAnalyzerPlugin());
}
```

then add in webpack.config
interface and Configuration

```js
interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer: boolean;
}
....
const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 5001,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
  });
```

then we can run command for npm in terminal with key analyzer like this

```shell
npm run build:prod -- --env analyzer=true
```

only this command will create map around bundle and chunks for us.

## aliases

Пока в проекте работаем с относительными путями, т.е.
./path_dir/file_name - это в текущей папке

Теперь хотим работает с абсолютными путями -
от root,
от https://
и т.д.

если вложенность небольшая, то относительные пути выглядят неплохо
../path_dir/file_name - это на один уровень выше
../../path_dir/file_name - это на два уровня выше

### Объявляем алиасы в секции resolve

Change file types.ts, add parameter **src**
It is alias for our folder "src".

```js
export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
}
```

Add section aliases to buildResolvers.ts where is webpack.Configuration['resolve']

```js
export function buildResolvers(
  options: BuildOptions
): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src,
    },
  };
}
```

Add declere path to src to the webpack.config

```js
const paths: BuildPaths = {
  output: path.resolve(__dirname, 'dist'),
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  src: path.resolve(__dirname, 'src'),
};
```

Add path with alias src to tsconfig too.
It is needed two parameters - "baseUrl" and "paths"

```js
"allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
```

## assets

Processing of media content like icons, images, etc.

We need to use loader for processing those files - png loader, jpg loader etc.
https://webpack.js.org/guides/asset-management/

Add assets loader to section loaders in webpack

in file buildLoaders.ts

```js
const assetsLoader = {
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: 'asset/resource',
};
```

and add const assetsLoader to return array of loaders.

Also add declare for TS in file global.d.ts

```js
declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
```

Now we can import picture from picture's file like this

```js
import Laguna from '@/assets/laguna-3024x4032.jpg';
```

and variable Laguna will be reterned path to picture.

```js
<img src={Laguna} alt="" loading="lazy" />
```
