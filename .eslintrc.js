const project = './tsconfig.json';

module.exports = {
    root: true,
    env: {
        jest: true,
        browser: true,
        es6: true,
        node: true,
        'react-native/react-native': true,
    },
    extends: [
        'expo',
        'prettier',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
    ],
    plugins: [
        'prettier',
        'react',
        'react-native',
        'react-hooks',
        'react-refresh',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project,
            },
        },
    },
    parser: '@typescript-eslint/parser',
    ignorePatterns: ['/dist/*', 'src/app-example/*'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                jsxSingleQuote: true,
                allowTemplateLiterals: true,
                endOfLine: 'auto',
            },
        ],

        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],

        // Enforce proper React Native styles
        'react-native/no-inline-styles': 'error',
        'react-native/no-unused-styles': 'error',
        'react-native/sort-styles': 'off',
        'react-native/split-platform-components': 'error',
        'react-native/no-color-literals': 'error',
        'react-native/no-raw-text': 'error',
        'react-native/no-single-element-style-arrays': 'error',

        // Allow `any` but warn if used
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/consistent-type-definitions': [
            'error',
            'interface',
        ],
        '@typescript-eslint/no-empty-function': 'warn',

        // Allow unused variables prefixed with '_'
        '@typescript-eslint/no-unused-vars': [
            'warn',
            { argsIgnorePattern: '^_' },
        ],

        // Enforce import ordering
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'always',
            },
        ],
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'import/no-self-import': 'error',
        'import/no-cycle': 'error',

        // Ensure correct dependencies in hooks
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

        'react/react-in-jsx-scope': 'off',
    },
    overrides: [
        {
            files: ['**/*.{ts,tsx}'],
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
                ecmaVersion: 2021,
                sourceType: 'module',
                project: project,
            },
        },
    ],
};
