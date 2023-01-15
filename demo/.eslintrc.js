 module.exports = {
    root: true,
    // parser: '@babel/eslint-parser',
    parser: "vue-eslint-parser",
    env: {
      browser: true,
      jest: true,
      es6: true,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.vue'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.vue'],
    },
    extends: [
        'plugin:vue/base',
    ],
  
    plugins: ['vue'],
  
    rules: {
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-plusplus': 'off',
      'no-underscore-dangle': 'off',
      'no-param-reassign': 'off',
      'no-restricted-globals': 'off',
      'import/prefer-default-export': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-prop-types': 'off',
      'vue/no-v-html': 'off',
    },
  };
