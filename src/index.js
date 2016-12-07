const marked = require('marked');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');

const renderer = new marked.Renderer();

// Override the render function for links
renderer.link = function link(paramHref, title, text) {
  let prot = null;
  let href = paramHref;
  let out = null;
  if (this.options.sanitize) {
    try {
      prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (
      prot.indexOf('javascript:') === 0 || // eslint-disable-line no-script-url
      prot.indexOf('vbscript:') === 0
    ) {
      return '';
    }
  }

  if (href.indexOf('.md') > 0) {
    href = `${href.slice(0, -2)}htm`;
  }

  out = `<a href="${href}"`;
  if (title) {
    out += ` title="${title}"`;
  }
  out += `>${text}</a>`;
  return out;
};

/**
 * reads a file, returns a promise, returns the same promise if called thereafter.
 */
const readFileCache = (() => {
  const cache = {};
  return (filePath) => {
    cache[filePath] =
      {}.hasOwnProperty.call(cache, filePath) ?
      cache[filePath] :
      new Promise((resolve, reject) =>
        fs.readFile(filePath, 'utf8', (err, data) =>
          (err ? reject(err) : resolve(data))
        )
      );
    return cache[filePath];
  };
})();

const processFiles = (files, findOutputPath, replaceWith, output) => {
  let returnChain = Promise.resolve();

  files.forEach((file) => {
    // get the current path of the target file
    const curPath = path.resolve(file);
    let finalPath = file;
    // create the destination path
    // trim the sub directories if you don't want them'
    if (findOutputPath) {
      // TODO: move regex out of loop since it never changes
      finalPath = file.replace(new RegExp(`^${findOutputPath}`), replaceWith);
    }

    let newPath = path.resolve(path.join('./', output, finalPath));
    newPath = `${newPath.slice(0, -2)}htm`;

    // create the destination directory path
    const newDirPath = path.dirname(newPath);

    returnChain = returnChain
    .then(() => readFileCache(curPath))
    .then(contents => new Promise((resolve, reject) =>
      // create destination directory
      mkdirp(newDirPath, err =>
        (err ? reject(err) : resolve(contents))
      )
    )).then(contents => new Promise((resolve, reject) =>
      // write out target file to destination
      readFileCache(path.join(__dirname, 'style.css')).then(stylesheet =>
        fs.writeFile(
          newPath,
          // convert to htm and style
          `<!DOCTYPE><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${stylesheet}</style></head><body>${marked(contents)}</body></html>`,
          { encoding: 'utf8' },
          err => (err ? reject(err) : resolve())
        )
      ).catch(err => reject(err))
    ));
  });
  return returnChain;
};

const markedDirectory = (
  [
    input = '{./docs/**/*.md,./*.md}',
    output = './docsBuild',
    findOutputPath = '',
    replaceWith = '',
  ], {
    logger = console.log, // eslint-disable-line no-console
    markedOptions, // options for marked
  }
) => new Promise((resolve, reject) => {
  if (markedOptions) {
    marked.setOptions(
      Object.assign(markedOptions, {
        renderer: markedOptions.renderer || renderer, // default renderer
      })
    );
  }
  // find all target files
  return glob(input, (err, files) =>
    (err ? reject(err) : resolve(files))
  );
})
.then(files => new Promise((resolve, reject) =>
  // create target files directory
  mkdirp(output, err =>
    (err ? reject(err) : resolve(files))
  )
))
.then(files => processFiles(files, findOutputPath, replaceWith, output))
.catch(err => logger(err));

module.exports = (...args) => markedDirectory.apply(this, [args[0] || [], args[1] || {}]);
