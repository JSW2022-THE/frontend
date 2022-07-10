module.exports = {
    parser: "postcss-scss",
    plugins: [
        require("postcss-flexbugs-fixes"),
        require("autoprefixer"),
        require("postcss-fail-on-warn"),
    ],
};