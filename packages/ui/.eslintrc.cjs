module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  settings: {
    react: {
      version: "detect",
    },
  },
  // This config does not extend the base config, giving us full control.
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  rules: {
    // --- The Fixes ---
    // 1. This rule definitively turns off the prop-type warnings for 'className' and 'type'.
    "react/prop-types": "off",
    // 2. This rule tells ESLint that with modern Next.js/React, you don't need to import React in every file.
    "react/react-in-jsx-scope": "off",
  },
  // This ensures the config file itself is not linted, which fixes the "'module' is not defined" error.
  ignorePatterns: [".eslintrc.js"],
};

