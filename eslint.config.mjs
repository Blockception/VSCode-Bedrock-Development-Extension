import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    files: ["**/*.ts"],
    ignores: ["client/out/**/*", "shared/out/**/*", "server/out/**/*", "node_modules/**/*"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      jest: {},
    },
  },
  {
    rules: {
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-explicit-any": "off"
    },
  }
);
