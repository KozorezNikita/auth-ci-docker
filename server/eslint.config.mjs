import js from "@eslint/js";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  // 🚫 ignore build output
  {
    ignores: [
      "node_modules",
      "dist",
      "build"
    ],
  },

  // ✅ базові JS правила
  js.configs.recommended,

  {
    files: ["**/*.{ts,js}"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node, // 👈 важливо для backend
      },
    },

    plugins: {
      "@typescript-eslint": tsPlugin,
    },

    rules: {
      // базові
      "no-console": "off", // backend часто використовує console

      // TypeScript
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];