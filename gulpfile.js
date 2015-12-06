var gulp = require('gulp');
var gutil = require("gulp-util");

var path = require('path');

var webpack = require('webpack');
var karma = require('karma');

/******************************************************************************/

var webpackModuleConfig = {
  loaders: [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel?presets=es2015',
  }]
}

var webpackConfig = {
  entry: './src/entry.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  devtool: 'inline-source-map',
  module: webpackModuleConfig
};

/******************************************************************************/

gulp.task("js", function(done) {
  webpack(webpackConfig, function(err, stats) {
      if(err) throw new gutil.PluginError("webpack", err);

      gutil.log("[webpack]", stats.toString());
      done();
  });
});

gulp.task("test", function(done) {
  new karma.Server({
    files: [
      './test/**/*.spec.js'
    ],

    preprocessors: {
      './test/**/*.spec.js': ['webpack']
    },

    webpack: {
      devtool: 'inline-source-map',
      module: webpackModuleConfig
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha-reporter')
    ],

    reporters: ['mocha'],
    frameworks: ['jasmine'],
    browsers: ['PhantomJS'],
    singleRun: true
  }, done).start();
});

/******************************************************************************/

gulp.task('default', ['js']);
