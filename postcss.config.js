module.exports = {
    parser: "postcss-scss",
    options: {
        sourceMap: true,
    },
    plugins: [
        "postcss-flexbugs-fixes",
        "autoprefixer",
        "postcss-fail-on-warn",
    ],
};