const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const sync = require('browser-sync').create()
const sequence = require('run-sequence')
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const webpackConfig = require('./webpack.config.js')

gulp.task('stylus', () => {
  gulp
    .src('app/stylesheets/index.styl')
    .pipe($.stylus())
    .on('error', err => console.log(err))
    .pipe(gulp.dest('./dev/stylesheets'))
})

gulp.task('javascripts', () => {
  gulp
    .src('app/javascripts/index.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('./dev/javascripts'))
})

gulp.task('sounds', () => {
  gulp
    .src('app/sounds/*.wav')
    .pipe(gulp.dest('./dev/sounds'))
})

gulp.task('pug', () => {
  gulp
    .src('app/index.pug')
    .pipe($.pug({ pretty: true }))
    .pipe(gulp.dest('./dev/'))
})

gulp.task('run', () => {
  return sync.init({
    open: false,
    notify: false,
    directory: true,
    server: {
      baseDir: ['/web/']
    }
  })
})

gulp.task('webpack-dev-server', () => {
  new webpackDevServer(webpack(webpackConfig), {
    publicPath: '/',
    contentBase: './dev',
    stats: {
      colors: true
    }
  }).listen(8080, 'localhost', err => {
    if (err) console.log(err)
  })
})

gulp.task('watch', function () {
  // $.watch('./**/*.js', () => {
  //   sequence('javascripts')
  // })

  $.watch('./**/*.pug', () => {
    sequence('pug')
  })
  
  $.watch('**/*.styl', () => {
    sequence('stylus')
  })
})

gulp.task('default', () => {
  sequence('pug', 'stylus', 'sounds', 'javascripts', 'webpack-dev-server', 'watch')
})