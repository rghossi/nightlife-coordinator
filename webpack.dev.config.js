const webpack = require('webpack');
const path = require('path');

module.exports = {
    cache: true,
     entry: {
        clientApp: ['./src/client.app.js', 'webpack-hot-middleware/client', 'webpack/hot/dev-server']
    },
    devtool: 'source-map',
    target: 'web',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'src', 'static', 'js'),
        publicPath: 'http://localhost:3000/js/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
 
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
             loaders: [
                'react-hot-loader', 
                'babel-loader?presets[]=react,presets[]=es2015'
            ]
        }]
    }
}