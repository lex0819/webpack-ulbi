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
