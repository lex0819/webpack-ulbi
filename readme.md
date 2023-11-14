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
