module.exports = {
  webpackConfig: require('./webpack.config.demo'),
  outputPath: '/',
  devServer: {
    /**
     * methods
     * Type: Array
     * Default: [ 'GET', 'HEAD' ]
     */
    methods: ['GET', 'HEAD'],
    /**
     * headers
     * Type: Object
     * Default: undefined
     */
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    /**
     * index
     * Type: String
     * Default: undefined
     * "index.html", // The index path for web server, defaults to "index.html". // If falsy (but not undefined), the server will not respond to requests to the root URL.
     */
    index: 'index.html',

    /**
     * lazy
     *
     * Type: Boolean
     * Default: undefined
     *
     * This option instructs the module to operate in 'lazy' mode, meaning that it won't recompile
     * when files change, but rather on each request.
     */
    lazy: undefined,

    /**
     * logger
     * Type: Object
     * Default: webpack-log
     * In the rare event that a user would like to provide a custom logging interface, this property allows the user to assign one. The module leverages webpack-log for creating the loglevelnext logging management by default. Any custom logger must adhere to the same exports for compatibility. Specifically, all custom loggers must have the following exported methods at a minimum:
     *
     * log.trace
     * log.debug
     * log.info
     * log.warn
     * log.error
     */
    // logger: undefined,

    /**
     * logLevel
     * Type: String
     * Default: 'info'
     * This property defines the level of messages that the module will log. Valid levels include:
     * trace | debug | info | warn | error | silent
     */
    logLevel: 'info',

    /**
     * logTime
     * Type: Boolean
     * Default: false
     */
    logTime: false,

    /**
     * mimeTypes
     * Type: Object
     * Default: null
     *
     * This property allows a user to register custom mime types or extension mappings. eg. mimeTypes: { 'text/html': [ 'phtml' ] }.
     *
     * By default node-mime will throw an error if you try to map a type to an extension that is already assigned to another type. Passing force: true will suppress this behavior (overriding any previous mapping). eg. mimeTypes: { typeMap: { 'text/html': [ 'phtml' ] } }, force: true }.
     */
    mimeTypes: null,
    /**
     * publicPath
     * Type: String
     * Required
     *
     * The public path that the middleware is bound to. Best Practice: use the same publicPath defined in your webpack config. For more information about publicPath, please see the webpack documentation.
     */
    publicPath: '/',

    /**
     * reporter
     * Type: Object
     * Default: undefined
     *
     * Allows users to provide a custom reporter to handle logging within the module. Please see the default reporter for an example.
     */
    reporter: undefined,

    /**
     * serverSideRender
     * Type: Boolean
     * Default: undefined
     *
     * Instructs the module to enable or disable the server-side rendering mode. Please see Server-Side Rendering for more information.
     */
    serverSideRender: true,

    /**
     * stats
     * Type: Object
     * Default: { context: process.cwd() }
     *
     * Options for formatting statistics displayed during and after compile. For more information and property details, please see the webpack documentation.
     */
    // stats: { context: process.cwd() },

    /**
     * watchOptions
     * Type: Object
     * Default: { aggregateTimeout: 200 }
     *
     * The module accepts an Object containing options for file watching, which is passed directly to the compiler provided. For more information on watch options please see the webpack documentation
     */
    watchOptions: { aggregateTimeout: 200 },

    /**
     * writeToDisk
     * Type: Boolean|Function
     * Default: false
     *
     * If true, the option will instruct the module to write files to the configured location on disk as specified in your webpack config file. Setting writeToDisk: true won't change the behavior of the webpack-dev-middleware, and bundle files accessed through the browser will still be served from memory. This option provides the same capabilities as the WriteFilePlugin.
     *
     * This option also accepts a Function value, which can be used to filter which files are written to disk. The function follows the same premise as Array#filter in which a return value of false will not write the file, and a return value of true will write the file to disk. eg.
     *
     *    {
     *      writeToDisk: (filePath) => {
     *        return /superman\.css$/.test(filePath);
     *      };
     *    }
     */
    writeToDisk: false,

    /**
     * fs
     * Type: Object
     * Default: MemoryFileSystem
     *
     * Set the default file system which will be used by webpack as primary destination of generated files. Default is set to webpack's default file system: memory-fs. This option isn't affected by the writeToDisk option.
     *
     * Note: As of 3.5.x version of the middleware you have to provide .join() method to the fs instance manually. This can be done simply by using path.join:
     *    fs.join = path.join; // no need to bind
     */
    // fs: MemoryFileSystem

    proxy: [
      {
        path: ['/api/*'],
        // https://github.com/nodejitsu/node-http-proxy#options
        target: 'https://portal-web-test.app.terminus.io',
        changeOrigin: true,
        cookieDomainRewrite: '',
        logLevel: 'debug',
      },
    ],

    /**
     * host
     * Type: String
     * Default: localhost
     * Required
     */
    host: 'localhost',

    /**
     * port
     * Type: Integer
     * Default: 3000
     * Required
     */
    port: 3000,

    /**
     * open browser when after compile
     */
    openBrowserOnDev: true,
  },
};
