# marked-directory

[![NPM Version](https://img.shields.io/npm/v/marked-directory.svg?style=flat-square)](https://www.npmjs.com/package/marked-directory) 
[![NPM Downloads](https://img.shields.io/npm/dm/marked-directory.svg?style=flat-square)](https://www.npmjs.com/package/marked-directory)
[![Build Status](https://img.shields.io/travis/SRSsoft/marked-directory/master.svg?style=flat-square)](https://travis-ci.org/SRSsoft/marked-directory)
[![Code Coverage](https://coveralls.io/repos/github/SRSsoft/marked-directory/badge.svg?branch=master)](https://coveralls.io/github/SRSsoft/marked-directory)
[![Dependency Status](https://david-dm.org/srssoft/marked-directory.svg)](https://david-dm.org/srssoft/marked-directory)
[![devDependency Status](https://david-dm.org/srssoft/marked-directory/dev-status.svg)](https://david-dm.org/srssoft/marked-directory#info=devDependencies)

Markdown to HTML conversion on entire directories using [marked](https://www.npmjs.com/package/marked)

## Installation

### Add to your project locally

```
npm install marked-directory --save-dev 
```

### Or add it globally

```
npm install -g marked-directory
```

## Usage

### Example

```
const md = require('marked-directory');

// returns a promise
md([
    './test/docs/**/*.md', 
    './test/docsBuild',
    './test/docs/',
    './'
]).then(() => console.log('done'));
```

### Options

```
md(
    [
        './test/docs/**/*.md', // Glob pattern to find files
        './test/docsBuild', // Path to output rendered files
        './test/docs/', // (optional) SearchValue to find in destination paths
        './' // (optional) Replacement value if the above SearchValue is found
    ], {
        logger, // default logging is console.log
        markedOptions // override marked options
    }
);

```

## CLI

### Example

```
marked-directory './test/docs/**/*.md' './test/docsBuild' './test/docs/' './'
```

### Options

```
marked-directory [glob to markdown files] [output directory] [path searchValue to replace] [path newValue if found by previous arg]
```

