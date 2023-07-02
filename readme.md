# Настройка проекта:

- npm init -y
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


## Файлы конфигурации:

### jest:
- jest.config.js
- babel.config.js

### eslint & prettier:
- .eslintrc.js