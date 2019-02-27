const path = require('path');
const extname = path.extname;
const yaml = require('js-yaml');
const fs = require('fs');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Supported metadata parsers.
 */

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad
};

/**
 * Metalsmith plugin to hide drafts from the output.
 *
 * @param {Object} opts
 * @return {Function}
 */

function plugin(opts){
  opts = opts || {};

  return function(files, metalsmith, done){
    const metadata = metalsmith.metadata();
    const exts = Object.keys(parsers);
    for (var key in opts) {
      const file = path.normalize(opts[key].replace(/([\/\\])/g, path.sep));
      const ext = extname(file);
      if (!~exts.indexOf(ext)) throw new Error('unsupported metadata type "' + ext + '"');
      const parse = parsers[ext];
      try {
        let data = fs.readFileSync(file, { encoding: 'utf8' });
        data = parse(data);
        if (metadata[key]) {
          data = Object.assign({}, metadata[key], data);
        }
        metadata[key] = data;
      } catch (e) {
        throw new Error(`Err: ${e.toString()}. File: ${file}`)
      }
    }

    done();
  };
}
