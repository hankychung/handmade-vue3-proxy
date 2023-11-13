import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'iife',
    name: 'Vue'
  },
  watch: {
    include: ['src/**']
  },
  plugins: [typescript()]
}
