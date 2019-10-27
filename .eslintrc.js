module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/base",
    "plugin:vue/recommended",
    "plugin:vue/essential",
    "@vue/airbnb",
    "@vue/typescript",
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: ["error", "double"],
    "import/extensions": [
      { ts: "never" },
    ],
    "max-len": [2, 120, 4, { ignoreUrls: true }],
    "import/prefer-default-export": "off",
    "lines-between-class-members": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "class-methods-use-this": "off",
    "no-return-assign": "off",
    "no-param-reassign": "off",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
};
