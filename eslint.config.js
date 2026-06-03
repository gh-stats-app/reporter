const js = require('@eslint/js');
const jestPlugin = require('eslint-plugin-jest');
const globals = require('globals');

module.exports = [
    {
        ignores: ['node_modules/**', '**/*.d.ts']
    },
    js.configs.recommended,
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'commonjs',
            globals: {
                ...globals.node
            }
        },
        rules: {
            indent: ['error', 4],
            'linebreak-style': ['error', 'unix'],
            quotes: ['error', 'single'],
            semi: ['error', 'always']
        }
    },
    {
        files: ['index.spec.js'],
        plugins: {
            jest: jestPlugin
        },
        languageOptions: {
            globals: {
                ...globals.jest
            }
        }
    }
];
