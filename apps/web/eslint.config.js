import js from "@eslint/js";
import globals from "globals";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";
import unicornPlugin from "eslint-plugin-unicorn";
import sonarjsPlugin from "eslint-plugin-sonarjs";
import importXPlugin from "eslint-plugin-import-x";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";

export default tseslint.config(
  { ignores: ["dist", "src/hooks/contracts.ts"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      perfectionist: perfectionistPlugin,
      unicorn: unicornPlugin,
      sonarjs: sonarjsPlugin,
      "import-x": importXPlugin,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...perfectionistPlugin.configs["recommended-natural"].rules,
      ...unicornPlugin.configs.recommended.rules,
      ...sonarjsPlugin.configs.recommended.rules,
      ...importXPlugin.configs.recommended.rules,
    },
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: "packages/*/{ts,js}config.json",
        }),
      ],
    },
  },
);
