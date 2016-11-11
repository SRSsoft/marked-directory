const marked = require('marked');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');

const renderer = new marked.Renderer();

/*eslint-disable*/
const stylesheet = `
@font-face {
  font-family: octicons-link;
  src: url(data:font/woff;charset=utf-8;base64,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) format('woff');
}

body {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  color: #333;
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  line-height: 1.6;
  word-wrap: break-word;
}

a {
  background-color: transparent;
}

a:active,
a:hover {
  outline: 0;
}

strong {
  font-weight: bold;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

img {
  border: 0;
}

hr {
  box-sizing: content-box;
  height: 0;
}

pre {
  overflow: auto;
}

code,
kbd,
pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

input {
  color: inherit;
  font: inherit;
  margin: 0;
}

html input[disabled] {
  cursor: default;
}

input {
  line-height: normal;
}

input[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

td,
th {
  padding: 0;
}

* {
  box-sizing: border-box;
}

input {
  font: 13px / 1.4 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

a {
  color: #4078c0;
  text-decoration: none;
}

a:hover,
a:active {
  text-decoration: underline;
}

hr {
  height: 0;
  margin: 15px 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-bottom: 1px solid #ddd;
}

hr:before {
  display: table;
  content: "";
}

hr:after {
  display: table;
  clear: both;
  content: "";
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 15px;
  margin-bottom: 15px;
  line-height: 1.1;
}

h1 {
  font-size: 30px;
}

h2 {
  font-size: 21px;
}

h3 {
  font-size: 16px;
}

h4 {
  font-size: 14px;
}

h5 {
  font-size: 12px;
}

h6 {
  font-size: 11px;
}

blockquote {
  margin: 0;
}

ul,
ol {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}

ol ol,
ul ol {
  list-style-type: lower-roman;
}

ul ul ol,
ul ol ol,
ol ul ol,
ol ol ol {
  list-style-type: lower-alpha;
}

dd {
  margin-left: 0;
}

code {
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  font-size: 12px;
}

pre {
  margin-top: 0;
  margin-bottom: 0;
  font: 12px Consolas, "Liberation Mono", Menlo, Courier, monospace;
}

.select::-ms-expand {
  opacity: 0;
}

.octicon {
  font: normal normal normal 16px/1 octicons-link;
  display: inline-block;
  text-decoration: none;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.octicon-link:before {
  content: '\\f05c';
}

.markdown-body:before {
  display: table;
  content: "";
}

.markdown-body:after {
  display: table;
  clear: both;
  content: "";
}

.markdown-body>*:first-child {
  margin-top: 0 !important;
}

.markdown-body>*:last-child {
  margin-bottom: 0 !important;
}

a:not([href]) {
  color: inherit;
  text-decoration: none;
}

.anchor {
  display: inline-block;
  padding-right: 2px;
  margin-left: -18px;
}

.anchor:focus {
  outline: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 1em;
  margin-bottom: 16px;
  font-weight: bold;
  line-height: 1.4;
}

h1 .octicon-link,
h2 .octicon-link,
h3 .octicon-link,
h4 .octicon-link,
h5 .octicon-link,
h6 .octicon-link {
  color: #000;
  vertical-align: middle;
  visibility: hidden;
}

h1:hover .anchor,
h2:hover .anchor,
h3:hover .anchor,
h4:hover .anchor,
h5:hover .anchor,
h6:hover .anchor {
  text-decoration: none;
}

h1:hover .anchor .octicon-link,
h2:hover .anchor .octicon-link,
h3:hover .anchor .octicon-link,
h4:hover .anchor .octicon-link,
h5:hover .anchor .octicon-link,
h6:hover .anchor .octicon-link {
  visibility: visible;
}

h1 {
  padding-bottom: 0.3em;
  font-size: 2.25em;
  line-height: 1.2;
  border-bottom: 1px solid #eee;
}

h1 .anchor {
  line-height: 1;
}

h2 {
  padding-bottom: 0.3em;
  font-size: 1.75em;
  line-height: 1.225;
  border-bottom: 1px solid #eee;
}

h2 .anchor {
  line-height: 1;
}

h3 {
  font-size: 1.5em;
  line-height: 1.43;
}

h3 .anchor {
  line-height: 1.2;
}

h4 {
  font-size: 1.25em;
}

h4 .anchor {
  line-height: 1.2;
}

h5 {
  font-size: 1em;
}

h5 .anchor {
  line-height: 1.1;
}

h6 {
  font-size: 1em;
  color: #777;
}

h6 .anchor {
  line-height: 1.1;
}

p,
blockquote,
ul,
ol,
dl,
table,
pre {
  margin-top: 0;
  margin-bottom: 16px;
}

hr {
  height: 4px;
  padding: 0;
  margin: 16px 0;
  background-color: #e7e7e7;
  border: 0 none;
}

ul,
ol {
  padding-left: 2em;
}

ul ul,
ul ol,
ol ol,
ol ul {
  margin-top: 0;
  margin-bottom: 0;
}

li>p {
  margin-top: 16px;
}

dl {
  padding: 0;
}

dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}

dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}

blockquote {
  padding: 0 15px;
  color: #777;
  border-left: 4px solid #ddd;
}

blockquote>:first-child {
  margin-top: 0;
}

blockquote>:last-child {
  margin-bottom: 0;
}

table {
  display: block;
  width: 100%;
  overflow: auto;
  word-break: normal;
  word-break: keep-all;
}

table th {
  font-weight: bold;
}

table th,
table td {
  padding: 6px 13px;
  border: 1px solid #ddd;
}

table tr {
  background-color: #fff;
  border-top: 1px solid #ccc;
}

table tr:nth-child(2n) {
  background-color: #f8f8f8;
}

img {
  max-width: 100%;
  box-sizing: content-box;
  background-color: #fff;
}

code {
  padding: 0;
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(0,0,0,0.04);
  border-radius: 3px;
}

code:before,
code:after {
  letter-spacing: -0.2em;
  content: "\\00a0";
}

pre>code {
  padding: 0;
  margin: 0;
  font-size: 100%;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}

.highlight {
  margin-bottom: 16px;
}

.highlight pre,
pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f7f7f7;
  border-radius: 3px;
}

.highlight pre {
  margin-bottom: 0;
  word-break: normal;
}

pre {
  word-wrap: normal;
}

pre code {
  display: inline;
  max-width: initial;
  padding: 0;
  margin: 0;
  overflow: initial;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}

pre code:before,
pre code:after {
  content: normal;
}

kbd {
  display: inline-block;
  padding: 3px 5px;
  font-size: 11px;
  line-height: 10px;
  color: #555;
  vertical-align: middle;
  background-color: #fcfcfc;
  border: solid 1px #ccc;
  border-bottom-color: #bbb;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #bbb;
}

.pl-c {
  color: #969896;
}

.pl-c1,
.pl-s .pl-v {
  color: #0086b3;
}

.pl-e,
.pl-en {
  color: #795da3;
}

.pl-s .pl-s1,
.pl-smi {
  color: #333;
}

.pl-ent {
  color: #63a35c;
}

.pl-k {
  color: #a71d5d;
}

.pl-pds,
.pl-s,
.pl-s .pl-pse .pl-s1,
.pl-sr,
.pl-sr .pl-cce,
.pl-sr .pl-sra,
.pl-sr .pl-sre {
  color: #183691;
}

.pl-v {
  color: #ed6a43;
}

.pl-id {
  color: #b52a1d;
}

.pl-ii {
  background-color: #b52a1d;
  color: #f8f8f8;
}

.pl-sr .pl-cce {
  color: #63a35c;
  font-weight: bold;
}

.pl-ml {
  color: #693a17;
}

.pl-mh,
.pl-mh .pl-en,
.pl-ms {
  color: #1d3e81;
  font-weight: bold;
}

.pl-mq {
  color: #008080;
}

.pl-mi {
  color: #333;
  font-style: italic;
}

.pl-mb {
  color: #333;
  font-weight: bold;
}

.pl-md {
  background-color: #ffecec;
  color: #bd2c00;
}

.pl-mi1 {
  background-color: #eaffea;
  color: #55a532;
}

.pl-mdr {
  color: #795da3;
  font-weight: bold;
}

.pl-mo {
  color: #1d3e81;
}

kbd {
  display: inline-block;
  padding: 3px 5px;
  font: 11px Consolas, "Liberation Mono", Menlo, Courier, monospace;
  line-height: 10px;
  color: #555;
  vertical-align: middle;
  background-color: #fcfcfc;
  border: solid 1px #ccc;
  border-bottom-color: #bbb;
  border-radius: 3px;
  box-shadow: inset 0 -1px 0 #bbb;
}

.task-list-item {
  list-style-type: none;
}

.task-list-item+.task-list-item {
  margin-top: 3px;
}

.task-list-item input {
  margin: 0 0.35em 0.25em -1.6em;
  vertical-align: middle;
}

:checked+.radio-label {
  z-index: 1;
  position: relative;
  border-color: #4078c0;
}`;
/*eslint-enable*/

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

// update to use our renderer
marked.setOptions({ renderer });

module.exports = ([input = '{./docs/**/*.md,./*.md}', output = './docsBuild', findOutputPath = '', repalceWith = '']) =>
  (new Promise((resolve, reject) =>
    // find all target files
    glob(input, (err, files) =>
      (err ? reject(err) : resolve(files))
    )
  )).then(files => new Promise((resolve, reject) =>
    // create target files directory
    mkdirp(output, err =>
      (err ? reject(err) : resolve(files))
    )
  )).then(files => new Promise((finalResolve, finalReject) =>
    // iterate over target files
    files.forEach((file) => {
      // get the current path of the target file
      const curPath = path.resolve(file);
      let finalPath = file;
      // create the destination path
      // trim the sub directories if you don't want them'
      if (findOutputPath) {
        // TODO: move regex out of loop since it never changes
        finalPath = file.replace(new RegExp(`^${findOutputPath}`), repalceWith);
      }

      let newPath = path.resolve(path.join('./', output, finalPath));
      newPath = `${newPath.slice(0, -2)}htm`;

      // create the destination directory path
      const newDirPath = path.dirname(newPath);

      (new Promise((resolve, reject) =>
        // read in target file contents
        fs.readFile(curPath, 'utf8', (err, contents) =>
          (err ? reject(err) : resolve(contents))
        )
      )).then(contents => new Promise((resolve, reject) =>
        // create destination directory
        mkdirp(newDirPath, err =>
          (err ? reject(err) : resolve(contents))
        )
      )).then(contents => new Promise((resolve, reject) =>
        // write out target file to destination
        fs.writeFile(
          newPath,
          // convert to htm and style
          `<!DOCTYPE><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${stylesheet}</style></head><body>${marked(contents)}</body></html>`,
          { encoding: 'utf8' },
          err => (err ? reject(err) : resolve())
        )
      )).catch(err => finalReject(err));
    })
  )).catch(err => console.error(err)); // eslint-disable-line no-console
