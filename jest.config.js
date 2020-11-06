module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  setupFilesAfterEnv: ["./tests/unit/jest.setup.ts"],
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
};
