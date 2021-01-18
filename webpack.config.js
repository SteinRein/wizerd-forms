const path = require('path');

// Plugins
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = [
	{
		mode: 'production',
		entry: {
			wizerdform: './core/index.ts',
		},
		optimization: {
			minimize: true,
			minimizer: [
				new TerserJSPlugin({
					terserOptions: {
						output: {
							comments: false,
						},
					},
					extractComments: false,
				})
			],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js',
			library: 'WizerdForm',
			libraryTarget: 'umd',
			umdNamedDefine: true,
		},
		resolve: {
			extensions: ['.ts', '.js', '.json']
		},
		module: {
			rules: [
				{
					test: /\.((j|t)sx?)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
			]
		}
	}
];
