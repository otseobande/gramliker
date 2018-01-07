const path = require('path');
const webpack = require('webpack')
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		popup: './popup.js',
		background: './background.js',
	},
	output: {
		path: path.resolve(__dirname,'js'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
			},
		]
	},

	plugins: [
	    new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
	    }),
	  ]
}

