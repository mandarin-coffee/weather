// module.exports = {
//   presets: [["@babel/preset-env", { targets: { node: "current" } }]],
// };
module.exports = (api) => ({
  // plugins: [
  //   "@babel/plugin-proposal-nullish-coalescing-operator",
  //   "@babel/plugin-proposal-optional-chaining"
  // ],
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        // caller.target will be the same as the target option from webpack
        corejs: "3.22",
        targets: api.caller((caller) => caller && caller.target === "node")
          ? { node: "current" }
          : { chrome: "58" },
      },
    ],
    "@babel/preset-typescript",
  ],
});
