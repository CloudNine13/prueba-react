module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  // Using airbnb js standards
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    // Adding prettier to eslint to evade usage problems
    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    /* Enabling the use of arrow functions as components because of Airbnb js standard configuration problem
     * https://stackoverflow.com/a/70051760/11472256
     */
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    /* Sometimes it cause rare situations producing import error
     * https://stackoverflow.com/a/44724874/11472256
     */
    'import/no-named-as-default': 0,
    // API's response has snake_case variables and ESLint doesn't like them
    camelcase: 'off'
  }
}
