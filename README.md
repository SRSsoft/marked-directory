# marked-directory

[![NPM Version](https://img.shields.io/npm/v/marked-directory.svg?style=flat-square)](https://www.npmjs.com/package/marked-directory) 
[![NPM Downloads](https://img.shields.io/npm/dm/marked-directory.svg?style=flat-square)](https://www.npmjs.com/package/marked-directory)
[![Dependency Status](https://david-dm.org/srssoft/marked-directory.svg)](https://david-dm.org/srssoft/marked-directory)
[![devDependency Status](https://david-dm.org/srssoft/marked-directory/dev-status.svg)](https://david-dm.org/srssoft/marked-directory#info=devDependencies)

Markdown to HTML conversion on entire directories using [marked](https://www.npmjs.com/package/marked)

## Add to your project

```
    npm install marked-directory --save-dev 
```

## Add to npm scripts

```
"scripts": {
    "buildDocs": "marked-directory [glob to markdown files] [output directory] [path searchValue to replace] [path newValue if found by previous arg]"
}
```

### Example

```
"scripts": {
    "buildDocs": "marked-directory './test/docs/**/*.md' './test/docsBuild' './test/docs/' './'"
}
```

## Command Line

```
npm run buildDocs
```
