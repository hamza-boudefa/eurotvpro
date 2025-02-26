import antfu from '@antfu/eslint-config';
// @ts-ignore
import nextPlugin from '@next/eslint-plugin-next';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tailwind from 'eslint-plugin-tailwindcss';

export default antfu(
  {
    react: true,
    typescript: true,

    lessOpinionated: true,
    isInEditor: false,

    stylistic: {
      semi: true,
    },

    formatters: {
      css: true,
    },

    ignores: [
      '**/node_modules',
      '.next',
      'next-env.d.ts',
    ],
  },
  ...tailwind.configs['flat/recommended'],
  jsxA11y.flatConfigs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    rules: {
      'antfu/no-top-level-await': 'off',
      'style/brace-style': 'off',
      'ts/consistent-type-definitions': 'off',
      'react/prefer-destructuring-assignment': 'off',
      'node/prefer-global/process': 'off',
      'tailwindcss/no-contradicting-classname': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
      'no-var': 'off',
      'import/no-unresolved': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'jsx-a11y/no-onchange': 'off',
    },
  }
)