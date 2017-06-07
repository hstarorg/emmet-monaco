const gulp = require('gulp4');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

gulp.task('build', () => {
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: [
      babel({
        presets: [['latest', { es2015: { modules: false } }]],
        exclude: 'node_modules/**' // only transpile our source code
      })
    ]
  })
    .then(bundle => {
      bundle.write({
        format: 'umd',
        moduleName: 'emmet-monaco',
        dest: 'dist/emmet-monaco.js',
        sourceMap: true
      });
    });
});

gulp.task('watch', done => {
  gulp.watch([
    'src/**/*'
  ], gulp.series('build'));
  done();
});

gulp.task('default', gulp.parallel('build', 'watch'));
