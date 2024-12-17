/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/base',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue/essential',
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-type-checked",
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    "plugin:vue/vue3-essential",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    project: ["./tsconfig.app.json"],
    indent: ["error", 2],
    "space-in-brackets": ["error", "always"],
    // parser: "vue-eslint-parser",
    parser: "@typescript-eslint/parser",
    // parserOptions: { 
    //   parser: "@typescript-eslint/parser" 
    // },
    // ecmaFeatures: {
    //   jsx:true
    // }
  },
  ignorePatterns: ["generatedIconName.ts"],
  rules: {
    "require-jsdoc": ["off"],
    "max-len": ["error", { code: 120 }],
    "no-undef": ["off"],
    "vue/multi-word-component-names": "off",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
}
