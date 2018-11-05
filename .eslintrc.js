module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jest": true,
        "jquery": true,
        "browser": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "sourceType": "module",
        "ecmaVersion": 2018
    },
    "rules": {
        "no-console": ["off"],
        "indent": [
            "error",
            "tab"
        ],
        "prefer-const": ["warn"],
        "eqeqeq": ["warn"],
        "comma-dangle": ["warn", "always-multiline"],
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "no-unused-vars": ["error", { "argsIgnorePattern": "next|res" }]
    }
}