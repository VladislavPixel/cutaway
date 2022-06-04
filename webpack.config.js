const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin") // пакет для выгрузки html в build
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // для очистки выходной папки и пересборки заново
const CopyPlugin = require("copy-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

const isDevelopmentMode = process.env.NODE_ENV === "development"
const isProductionMode = !isDevelopmentMode

const optimization = () => {
	const config = { splitChunks: { chunks: "all" } }
	if (isDevelopmentMode) {
		config.minimizer = [
			new TerserPlugin()
		]
	}
	return config
}

module.exports = {
	context: path.resolve(__dirname, "src"),
	mode: "development",
	entry: {
		main: "./script.js", // Входная точка
	},
	output: {
		filename: "[name].[contenthash].js", // выходной файл
		path: path.resolve(__dirname, "dist"), // папка выхода
	},
	devServer: {
		static: "./dist",
		port: 8080,
		open: true,
		hot: isDevelopmentMode
	},
	optimization: optimization(),
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
			inject: "body",
			minify: {
				collapseWhitespace: isProductionMode
			}
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin({
			patterns: [
				{ from: path.resolve(__dirname, "src/images/favicon.ico"), to: path.resolve(__dirname, "dist") }, // Для копирования статики
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader", // для поддержки old code JavaScript
					options: {
						presets: [
							["@babel/preset-env", { targets: "defaults" }]
						]
					}
				}
			},
			{
				test: /\.s[ac]ss$/i, // для SCSS/SASS
				use: ["style-loader", "css-loader", "sass-loader"] // Пропускаем справа налево
			},
			{
				test: /\.(png|svg|jpe?g|gif|mp4|ico)$/i,
				use: [
					{
						loader: "file-loader", // для подключения картинок как модули
						options: {
							name: "[path][name].[ext]" // С сохранением структуры
						}
					},
				],
			}
		]
	}
}