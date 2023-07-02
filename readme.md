Настройка проекта:

- npm init -y
- npm install --save-dev jest (установка jest)
- npx jest --init (настройка jest)
- npm install -D jest-environment-jsdom (установка jsDom)
- npm install --save-dev babel-jest @babel/core @babel/preset-env (Решение конфликта с import)
- npm i eslint -D (установка eslint)
- npx eslint --init (настройка eslint)
- npm i eslint-plugin-jest (установка плагина eslint для jest)
- npm install eslint-plugin-import --save-dev (установка плагина для import в eslint)
- npm i prettier -D (установка prettier)
- npm i eslint-config-prettier -D (установка конфига prettier)


Файлы конфигурации:

jest:
- jest.config.js
- babel.config.js

eslint & prettier:
- .eslintrc.js