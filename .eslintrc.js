module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-trailing-spaces': 'error',
        'max-depth': ['error', 3],
        'no-unused-vars': ['warn'],
        'no-console': ['warn'],
        eqeqeq: ['error', 'always'],
        curly: ['error', 'all'],
        'no-var': 'error',
        'prefer-const': 'error',
    },
}
