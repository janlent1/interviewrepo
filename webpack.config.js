const HtmlWebPackPlugin = require('html-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const webpack = require('webpack')
const RawSource = require("webpack-sources").RawSource;
const BabelOptions = {
    sourceType: 'unambiguous',
    // cacheDirectory: false,
    compact: false,
    babelrc: false,
    configFile: path.resolve(__dirname, "babel.config.js")
};
const babelLoader = {
    loader: 'babel-loader',
    options: BabelOptions
};
module.exports = {
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname,`./src/index.html`),
            filename: `./index.html`
        }),
        {
            apply: function (compiler) {
                compiler.hooks.thisCompilation.tap("BuildManifestConfig",function(compilation, compilationParams) {
                    compilation.hooks.processAssets.tapAsync({
                            name: 'BuildManifestConfig',
                            stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT
                        },
                        function (assets, callback) {
                            const processedEntrypoints = {};
                            const processedCssEntrypoints = {};
                            compilation.entrypoints.forEach((entrypoint, name) => {
                                processedEntrypoints[name] = entrypoint.getFiles().filter(thisAsset => !(thisAsset.endsWith(".map") || thisAsset.endsWith(".css")));
                            });
                            compilation.entrypoints.forEach((entrypoint, name) => {
                                processedCssEntrypoints[name] = entrypoint.getFiles().filter(thisAsset => thisAsset.endsWith(".css"));
                            });
                            compilation.emitAsset('buildManifest.json', new RawSource(JSON.stringify({
                                entrypoints: processedEntrypoints,
                                cssEntrypoints: processedCssEntrypoints,
                            })))
                            callback();
                        })
                })
            }
        }
    ],
    entry: path.resolve(__dirname, 'src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: [babelLoader]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: !isDevelopment }
                    }
                ]
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },
    devServer: {
        static: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: ['*', '.js']
    },
}
