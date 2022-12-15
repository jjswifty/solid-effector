import webpack, { EvalSourceMapDevToolPlugin } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export const devConfig: webpack.Configuration = {
    devtool: 'eval-cheap-source-map',
    devServer: {
        port: 3000,
        liveReload: false,
        hot: true,
    },
    target: 'web',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
                mode: 'write-references',
            },
        }),
        new EvalSourceMapDevToolPlugin({
            test: /\.(m?js|ts)x?$/,
        }),
    ],
};
