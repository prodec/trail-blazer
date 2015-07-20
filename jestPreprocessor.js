var babel = require('babel-core');

module.exports = {
  process: function (src, filename) {
    var options = {
      filename: filename,
      stage: 2
    };

    if (filename.indexOf('node_modules') === -1 && babel.canCompile(filename)) {
      return babel.transform(src, options).code;
    }

    return src;
  }
};
