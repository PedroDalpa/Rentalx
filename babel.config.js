module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@modules": "./src/modules",
          "@config": "./src/config",
          "@shared": "./src/shared",
          "@errors": "./src/errors",
          "@utils": "./src/utils",
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
  ]
}
/*
yarn add @babel/cli @babel/core @babel/node @babel/plugin-proposal-class-properties
  @babel/plugin-proposal-decorators @babel/preset-env babel-plugin-module-resolver
  babel-plugin-transform-typescript-metadata @babel/preset-typescript
*/