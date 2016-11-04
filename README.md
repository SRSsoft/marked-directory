# marked-directory

Markdown to HTML conversion on entire directories

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
    "buildDocs": "marked-directory ./test/docs/**/*.md ./test/docsBuild ./test/docs/ ./"
}
```

## Command Line

```
npm run buildDocs
```
