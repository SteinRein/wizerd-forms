const path = require('path');

// Plugins
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = [
	// Compile Javascript
	{
		mode: 'production',
		entry: {
			test: './core/index.js',
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
			libraryTarget: 'var',
		},
		module: {
			rules: [
				{
					test: /\.(jsx?)$/,
					exclude: /node_modules/,
					use: ['babel-loader']
				},
			]
		}
	}
];
