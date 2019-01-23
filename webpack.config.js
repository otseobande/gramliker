const path = require('path');
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

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
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
		]
	},

	plugins: [
	    new webpack.DefinePlugin({
	      'process.env': {
	        NODE_ENV: '"production"'
	      }
      }),
      new VueLoaderPlugin(),
	  ]
}

