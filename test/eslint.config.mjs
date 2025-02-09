import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    plugins: ["prefer-arrow", "@typescript-eslint/eslint-plugin", "prettier"],
    ignorePatterns: [".eslintrc.cjs", "node_modules/"],
    rules: {
      "arrow-body-style": "error",
      "prefer-const": "error",
      "no-var": "error",
      "prefer-arrow-callback": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "prefer-arrow/prefer-arrow-functions": [
        "warn",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],
      "multiline-ternary": "off",
      "@typescript-eslint/member-delimiter-style": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
  }),
];
export default eslintConfig;
