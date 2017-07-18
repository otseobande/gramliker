const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './app.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'popup.js'
	},
	module: {
		loaders: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			}
		]
	}
}