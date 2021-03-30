import path from 'path';
import webpack from 'webpack';
import { Configuration } from 'webpack';
import dotenv from "dotenv"

const env = dotenv.config().parsed;

const defineEnv = new webpack.DefinePlugin({
    'process.env': JSON.stringify(env)
})

const config: Configuration = {
    context: path.join(__dirname, 'src'),
    entry: './index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/assets',
    },
    plugins: [defineEnv],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ],
    },
    mode: "development",
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'static'),
        open: true,
        port: 3000,
    },
};

export default config;