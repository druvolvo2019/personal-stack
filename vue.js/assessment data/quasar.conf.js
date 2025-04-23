/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

console.log(process.env.DATA_MODE)
const boot = [
  'i18n',
  'storagePlugin',
  'loggedInUserPlugin',
  'graphqlClient',
  'naepAuthPlugin',
  'bus',
]

const fs = require('fs')
const localHttps = fs.existsSync('./localtest.conf.js')
  ? require('./localtest.conf.js')
  : { https: false, port: 8080 }

const path = require('path')

// const version = JSON.parse(packageJson).version || 0

function getAwsConfigFile(stage) {
  const selectFilename = () => {
    switch (stage) {
      case 'load':
        return 'load-awsconfiguration.json'
      case 'train':
        return 'train-awsconfiguration.json'
      case 'test':
        return 'test-awsconfiguration.json'
      case 'alpha':
        return 'alpha-awsconfiguration.json'
      case 'dev':
        return 'dev-awsconfiguration.json'
      case 'tablet':
        return 'tablet-awsconfiguration.json'
      case 'prod':
        return 'prod-awsconfiguration.json'
      default:
        return 'local-awsconfiguration.json'
    }
  }

  const fullFile = path.join(__dirname, 'config', selectFilename())

  console.log(`Using ${fullFile} for aws configuration`)
  console.log('Supported values for STAGE are test, alpha, dev (default)')
  return fullFile
}

const useLiveData = (process.env.DATA_MODE || 'live') === 'live'
console.log('useLiveData', useLiveData)

const awsConfig = useLiveData
  ? require(getAwsConfigFile(process.env.STAGE))
  : {}

console.log(awsConfig)

module.exports = function (/* ctx */) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files
    boot,

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      'mdi-v5',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-us', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      importStrategy: 'auto',

      components: [],
      directives: ['Ripple', 'ClosePopup'],
      // Quasar plugins
      plugins: ['Dialog', 'Notify'],
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ts
    supportTS: false,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      devtool: 'sourcemap',
      vueRouterMode: 'hash', // available values: 'hash', 'history'
      env: {
        DATA_MODE: process.env.DATA_MODE || 'live',
        AWS_CONFIG: awsConfig,
        STAGE: process.env.STAGE || 'normal',
        DEBUGGER: process.env.DEBUGGER || false,
      },

      // rtl: false, // https://quasar.dev/options/rtl-support
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            formatter: require('eslint').CLIEngine.getFormatter('stylish'),
          },
        }),
          (cfg.resolve.alias = {
            ...cfg.resolve.alias,
            public: path.resolve(__dirname, './public'),
          })
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      ...localHttps,
      open: true, // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: ['fadeIn', 'fadeOut', 'zoomIn', 'zoomOut'],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: { skipWaiting: true }, // only for GenerateSW
      manifest: {
        name: 'NAEPVirtualSchoolFolder',

        short_name: 'NAEP Virtual School Folders',
        description: 'NAEP Virtual School Folder application',
        display: 'standalone',
        orientation: 'portrait',

        background_color: '#ffffff',

        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.cordova.quasar.app',
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'folder_redesign',
      },

      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack(/* cfg */) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },
    },
  }
}
