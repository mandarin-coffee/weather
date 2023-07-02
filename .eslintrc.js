module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true, //
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jest"],
  rules: {
    "import/prefer-default-export": "off", //
    "import/extensions": "off", //
    "max-len": [ //
      "error",
      {
        ignoreComments: true,
      },
    ],
    quotes: ["error", "double"], //
  },
};
