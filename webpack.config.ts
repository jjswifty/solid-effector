import * as path from 'path';
import * as webpack from 'webpack';
import 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { DefinePlugin } from 'webpack';
import { CustomizeRule, mergeWithRules } from 'webpack-merge';
import { productionConfig } from './webpack.prod';
import { devConfig } from './webpack.dev';

type BaseConfig = (mode: 'production' | 'development' | 'none') => webpack.Configuration;

const baseConfig: BaseConfig = (mode) => ({
    mode,
    context: __dirname,
    entry: './src/index.tsx',
    devtool: false,
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Solid APP!',
        }),
        new DefinePlugin({
            __MODE__: JSON.stringify(mode),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
            },
        ],
    },
});

export default (_: unknown, { mode }: { mode: 'production' | 'development' }) => {
    return mergeWithRules({
        module: {
            rules: {
                test: CustomizeRule.Match,
                use: CustomizeRule.Prepend,
            },
        },
    })(baseConfig(mode), mode === 'production' ? productionConfig : devConfig);
};
