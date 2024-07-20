import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'build/index.js',
    format: 'esm'
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript()
  ]
};
