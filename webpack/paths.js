const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'dist'),
  entryPath: {
    index: path.resolve(__dirname, '../', 'src/index.jsx'),
    config: path.resolve(__dirname, '../', 'src/config/config.js'),
    hmr:
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
  },
  templatePath: path.resolve(__dirname, '../', 'src/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  jsonFolder: 'json',
  cssFolder: 'css',
  jsFolder: 'js',
};
