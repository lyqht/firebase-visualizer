var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var nodeExternals = require("webpack-node-externals");

const clientConfig = {
    entry: "./src/index.tsx",
    target: "web",
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: "babel-loader", exclude: /node_modules/ },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};

const serverConfig = {
    target: "node",
    entry: "./server/server.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "lib.node.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/
            }
        ]
    },
    // externals: {
    //     fs: "commonjs fs",
    //     path: "commonjs path"
    // },
    externals: [nodeExternals()]
};

module.exports = [clientConfig, serverConfig];
