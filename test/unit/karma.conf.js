// Karma configuration
// Generated on Sat Sep 30 2017 17:20:10 GMT+0000 (UTC)
const webpackConfig = require('../../build/webpack.test.conf.js');
const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

delete webpackConfig.entry;
module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['../../node_modules/es6-promise/dist/es6-promise.auto.js',
            '../../node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
            './index.js'],
    // we will pass the entry file to webpack for bundling.
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    plugins: [
      // Launchers
      'karma-chrome-launcher',

      // Test Libraries
      'karma-mocha',
      'karma-sinon-chai',

      // Preprocessors
      'karma-webpack',
      'karma-sourcemap-loader',

      // Reporters
      'karma-spec-reporter',
      'karma-coverage',
    ],
    // optionally, configure the reporter
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    webpack: webpackConfig,
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome_without_security'], 
    // you can define custom flags
    customLaunchers: {
      Chrome_without_security: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  });
};
