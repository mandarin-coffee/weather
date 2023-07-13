# Настройка проекта:

- npm init -y <br> _(инициализация npm проекта)_
- npm install --save-dev jest <br> _(установка jest)_
- npx jest --init <br> (_настройка jest)_
- npm install -D jest-environment-jsdom <br> _(установка jsDom)_
- npm install --save-dev babel-jest @babel/core @babel/preset-env <br> _(Решение конфликта с import)_
- npm i eslint -D <br> _(установка eslint)_
- npx eslint --init <br> _(настройка eslint)_
- npm i eslint-plugin-jest <br> _(установка плагина eslint для jest)_
- npm install eslint-plugin-import --save-dev <br> (_установка плагина для import в eslint)_
- npm i prettier -D <br> _(установка prettier)_
- npm i eslint-config-prettier -D <br> _(установка конфига prettier)_
- npx mrm lint-staged <br> _(установка husky pre-commit)_
- npm install webpack webpack-cli --save-dev _(установка webpack)_
- npm install --save-dev babel-loader @babel/core @babel/preset-env _(babel для webpack)_
- npm install --save-dev html-webpack-plugin _(плагин для сборки HTML)_
- npm install --save-dev webpack webpack-dev-server _(dev сервер)_
- npm install --save-dev html-loader _(слежение за html в dev режиме)_
- npm install --save-dev css-loader _(css загрузчик)_
- npm install --save-dev style-loader _(style загрузчик)_
- npm install --save-dev mini-css-extract-plugin _(загрузка стилей файлами)_
- npm install css-minimizer-webpack-plugin --save-dev _(сжатие css)_
- npm install sass-loader node-sass --save-dev _(подключение sass)_

## Файлы конфигурации:

### jest:

- jest.config.js
- babel.config.js

### eslint & prettier:

- .eslintrc.js

### webpack:

- webpack.config.js.js
- #### Плагины для webpack
- - HtmlWebpackPlugin
