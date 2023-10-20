module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true, //
  },
  parser: "@typescript-eslint/parser",
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
  // parserOptions: {
  //  ecmaVersion: "latest",
  //  sourceType: "module",
  // },
  plugins: ["jest", "@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off", //
    "import/extensions": "off", //
    "max-len": [
      "error",
      {
        ignoreComments: true,
      },
    ],
    quotes: ["error", "double"], //
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    "consistent-return": "off",
    "no-console": "off",
    "import/no-unresolved": "off",
  },
};
