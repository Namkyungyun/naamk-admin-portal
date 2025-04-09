import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const [WARN, ERROR] = [1, 2]
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
  ),
  {
    plugins: {
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      react,
      prettier,
    },
    rules: {
      'no-unused-vars': [
        WARN,
        { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
      ],
      'simple-import-sort/imports': WARN,
      'simple-import-sort/exports': WARN,
      'unused-imports/no-unused-imports': WARN,
      'unused-imports/no-unused-vars': [
        WARN,
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      'react/display-name': WARN,
      'react/jsx-key': WARN,
      'react/jsx-no-duplicate-props': WARN,
      'react/jsx-no-target-blank': WARN,
      'react/jsx-no-undef': ERROR,
      'react/jsx-uses-react': ERROR,
      'react/jsx-uses-vars': ERROR,
      'react/no-children-prop': WARN,
      'react/no-deprecated': ERROR,
      'react/no-direct-mutation-state': ERROR,
      'react/no-find-dom-node': WARN,
      'react/no-render-return-value': WARN,
      'react/no-string-refs': WARN,
      'react/no-unescaped-entities': WARN,
      'react/no-unknown-property': [WARN, { ignore: ['popoverTarget'] }],
      'react/no-unsafe': WARN,
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          jsxSingleQuote: true,
          endOfLine: 'auto',
        },
      ],
    },
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    settings: {
      react: {
        version: '19.0.0', // 해당버전만 불러오도록 하드코딩(버전업시 갱신)
      },
    },
  },
]

export default eslintConfig
