
// eslint-disable-next-line import/no-unused-modules
module.exports = {
    root: true,
    extends: [
        'prettier',
        'eslint:recommended',
        '@react-native-community',
        'plugin:react/recommended',
        'plugin:import/typescript',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    plugins: [
        'react',
        'import',
        'prettier',
        'react-hooks',
        'react-native',
        'unused-imports',
        'module-resolver',
        '@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            classes: true,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
    },
    env: {
        node: true,
        commonjs: true,
    },
    settings: {
        'import/ignore': ['react-native'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            'typescript': {},
            'babel-module': {},
        },
    },
    ignorePatterns: ['**/.gitkeep', 'babel.config.js'],
    rules: {
        // local syntax principles
        'no-multi-spaces': 'error',
        'quotes': ['error', 'single'],
        'comma-style': ['error', 'last'],
        'linebreak-style': ['error', 'unix'],
        'func-call-spacing': ['error', 'never'],
        'module-resolver/use-alias': [
            'error',
            {
                extensions: ['.ts', '.tsx'],
            },
        ],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: ['enum', 'enumMember', 'class'],
                format: ['PascalCase'],
            },
            {
                selector: 'variable',
                types: ['boolean'],
                format: ['camelCase'],
            },
        ],
        'key-spacing': ['error', { beforeColon: false, afterColon: true, mode: 'strict' }],

        // easy-to-read-and-refactor syntax
        'dot-notation': 'error',
        'default-case-last': 'error',
        'func-names': ['error', 'never'],
        'import/newline-after-import': 'error',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-color-literals': 'warn',
        'function-paren-newline': ['error', 'consistent'],
        'no-else-return': ['error', { allowElseIf: false }],
        'import/order': ['warn', { warnOnUnassignedImports: true }],
        '@typescript-eslint/no-shadow': ['error', { hoist: 'never' }],

        // code security enhancing syntax
        'default-case': 'error',
        'default-param-last': 'error',
        'init-declarations': ['warn', 'always'],
        'react-native/split-platform-components': 'error',

        // code cleanup rules
        'no-empty': 'warn',
        'react-native/no-unused-styles': 'warn',
        'unused-imports/no-unused-imports': 'error',
        'import/no-unused-modules': [1, { missingExports: true }],

        // hindering and useless syntax
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
        'no-empty-function': 'off',
        'react/display-name': 'off',
        'max-classes-per-file': 'off',
        'no-use-before-define': 'off',
        'import/no-unresolved': 'off',
        'react/style-prop-object': 'off',
        'react-native/sort-styles': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

// prettier config
        'prettier/prettier': [
            'error',
            {
                bracketSpacing: true,
                jsxBracketSameLine: false,
                jsxSingleQuote: true,
                printWidth: 120,
                semi: true,
                singleQuote: true,
                tabWidth: 4,
                trailingComma: 'all',
                quoteProps: 'consistent',
                arrowParens: 'avoid',
            },
        ],
    },
};