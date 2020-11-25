module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/valid-template-root": "off",
    "vue/valid-v-model": "off",
    "vue/no-template-key": "off",
    "vue/valid-v-for": "off",
    "vue/no-v-model-argument": "off",
    "vue/no-multiple-template-root": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "vue/no-unused-vars": "warn",
    "vue/no-unused-components": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
