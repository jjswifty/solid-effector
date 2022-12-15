import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

export const productionConfig: webpack.Configuration = {
    devtool: 'source-map',
    target: 'browserslist',
    plugins: [new MiniCssExtractPlugin()],
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name({ context }: unknown) {
                        if (context) {
                            const [, name] =
                                /[\\/]node_modules(?:\\.pnpm)?[\\/](.*?)(?:[\\/]|$)/.exec(
                                    context,
                                ) || [];
                            return name.replace('@', '');
                        }
                        return null;
                    },
                },
            },
        },
    },
};
