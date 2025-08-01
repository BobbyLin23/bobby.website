import antfu from '@antfu/eslint-config'

import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu({
  vue: true,
  typescript: true,
}, ...compat.config({
  extends: ['plugin:tailwindcss/recommended'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
}))
