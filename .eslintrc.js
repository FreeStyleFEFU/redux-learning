const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
    plugins: ['prettier'],
    extends: ['prettier'],
    root: true,
    env: {
        node: true,
        es6: true,
        jest: true,
    },
    rules: {
        'prettier/prettier': 'error',
        'linebreak-style': 'off',
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'eqeqeq': 'error',
        'object-shorthand': 'error',
        'consistent-return': 'error',
    },
    ignorePatterns: ['!.*.js'],
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: 'tsconfig.json',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            plugins: [
                '@typescript-eslint/eslint-plugin',
                'prettier',
                'jsx-a11y',
                'unused-imports',
                'effector',
                'import',
            ],
            extends: [
                'airbnb-typescript',
                'airbnb/hooks',
                'plugin:@typescript-eslint/recommended',
                'prettier',
                'plugin:effector/react',
                'plugin:effector/scope',
            ],
            rules: {
                '@typescript-eslint/interface-name-prefix': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/explicit-module-boundary-types': 'off',
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/no-namespace': 'off',
                'react/jsx-props-no-spreading': 'off',
                'react-hooks/exhaustive-deps': 'warn',
                // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
                'import/prefer-default-export': 'off',
                'import/prefer-named-export': 'off',
                'import/no-default-export': 'off',
                'no-debugger': 'error',
                'no-restricted-imports': [
                    'error',
                    {
                        paths: [
                            {
                                name: 'react',
                                importNames: ['default', 'FunctionComponent'],
                                message:
                                    "Importing 'React' is not necessary due to `runtime: 'automatic'` configuration for '@babel/plugin-transform-react-jsx'. Use FC instead of FunctionComponent.",
                            },
                            {
                                name: 'effector-react',
                                importNames: ['useUnit'],
                                message: `Import useUnit from 'effector-react/ssr' instead`,
                            },
                        ],
                    },
                ],
                // we want to throw new ApiError
                '@typescript-eslint/no-throw-literal': 'off',
                'react/no-array-index-key': 'off',
                'react/no-danger': 'off',
                'react/prop-types': 'off',
                'jsx-a11y/label-has-associated-control': [
                    'error',
                    {
                        required: {
                            some: ['nesting', 'id'],
                        },
                    },
                ],
                'jsx-a11y/label-has-for': 'off',
                'react/jsx-boolean-value': 'error',
                'react/display-name': 'off',
                '@typescript-eslint/naming-convention': [
                    'warn',
                    {
                        selector: 'variable',
                        format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
                        leadingUnderscore: 'allow',
                        trailingUnderscore: 'allow',
                    },
                    {
                        selector: 'property',
                        filter: '^__html$',
                        format: null,
                    },
                ],
                '@typescript-eslint/lines-between-class-members': 'off',
                '@typescript-eslint/strict-boolean-expressions': [
                    'error',
                    {
                        allowNullableObject: false,
                        allowNullableBoolean: true,
                    },
                ],
                'react/button-has-type': 'error',
                'react/boolean-prop-naming': 'error',
                'react/destructuring-assignment': 'warn',
                'jsx-a11y/click-events-have-key-events': 'error',
                '@typescript-eslint/no-unused-vars': 'off',
                'no-unused-vars': 'off',
                'unused-imports/no-unused-imports': 'error',
                'unused-imports/no-unused-vars': [
                    'warn',
                    {
                        vars: 'all',
                        varsIgnorePattern: '^_',
                        args: 'after-used',
                        argsIgnorePattern: '^_',
                    },
                ],
            },
        },
        {
            files: ['*.js'],
            parser: '@babel/eslint-parser',
        },
    ],
});
