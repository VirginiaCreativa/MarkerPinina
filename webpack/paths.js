const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  entryPath: {
    index: path.resolve(__dirname, '../', 'src/index.jsx'),
    configDate: path.resolve(__dirname, '../', 'src/config/date.js'),
  },
  templatePath: path.resolve(__dirname, '../', 'src/index.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
  cssFolder: 'css',
  jsFolder: 'js',
};
