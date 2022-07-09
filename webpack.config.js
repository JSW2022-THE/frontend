module.exports = {
    target: 'node',
    node: {
        fs: 'empty'
    },
    module: {
        loaders:[
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!postcss-loader"
            }
        ]
    }
}
