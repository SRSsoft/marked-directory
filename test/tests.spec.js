/* eslint-disable no-undef,no-console */
const expect = require('expect');
const md = require('../src/index.js');
const dirTree = require('directory-tree');
const rimraf = require('rimraf');

/**
 * recursively removes a property from an object, or objects in an array.
 */
const killProp = (obj, prop) => {
  if (Array.isArray(obj)) {
    return obj.map(val => killProp(val, prop));
  } else if ((typeof obj === 'object') && (obj !== null)) {
    const clone = Object.assign({}, obj);

    Object.keys(clone).forEach((key) => {
      if (key === prop) {
        delete clone[key];
      } else {
        clone[key] = killProp(clone[key], prop);
      }
    });

    return clone;
  }
  return obj;
};

describe('marked-directory', () => {
  afterEach(done =>
    rimraf('./test/docsBuild', (err) => {
      if (err) {
        throw err;
      }
      done();
    })
  );

  it('should fail', () => {
    // mock the console to test
    let lastMsg = null;

    const logger = (msg) => { lastMsg = msg; };

    return md(['./test/docs/**/*.md', -1], { logger }).then(() => {
      expect(lastMsg).toEqual(new TypeError('Path must be a string. Received -1'));
    });
  });

  it('should transform a directory', () =>
    md(['./test/docs/**/*.md', './test/docsBuild']).then(() => {
      const tree = killProp(dirTree('./test/docsBuild'), 'size');
      expect(tree).toEqual({
        path: './test/docsBuild',
        name: 'docsBuild',
        children: [
          {
            path: 'test/docsBuild/test',
            name: 'test',
            children: [
              {
                path: 'test/docsBuild/test/docs',
                name: 'docs',
                children: [
                  {
                    path: 'test/docsBuild/test/docs/README.htm',
                    name: 'README.htm',
                    extension: '.htm',
                  },
                  {
                    path: 'test/docsBuild/test/docs/subDirectory',
                    name: 'subDirectory',
                    children: [
                      {
                        path: 'test/docsBuild/test/docs/subDirectory/page1.htm',
                        name: 'page1.htm',
                        extension: '.htm',
                      },
                      {
                        path: 'test/docsBuild/test/docs/subDirectory/page2.htm',
                        name: 'page2.htm',
                        extension: '.htm',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
    })
  );


  it('should transform a directory and remove unnecessary sub directories', () =>
    md(['./test/docs/**/*.md', './test/docsBuild', './test/docs', './']).then(() => {
      const tree = killProp(dirTree('./test/docsBuild'), 'size');
      expect(tree).toEqual({
        path: './test/docsBuild',
        name: 'docsBuild',
        children: [
          {
            path: 'test/docsBuild/README.htm',
            name: 'README.htm',
            extension: '.htm',
          },
          {
            path: 'test/docsBuild/subDirectory',
            name: 'subDirectory',
            children: [
              {
                path: 'test/docsBuild/subDirectory/page1.htm',
                name: 'page1.htm',
                extension: '.htm',
              },
              {
                path: 'test/docsBuild/subDirectory/page2.htm',
                name: 'page2.htm',
                extension: '.htm',
              },
            ],
          },
        ],
      });
    })
  );

  it('should transform a directory and remove unnecessary sub directories and sanitize URLs', () =>
    md(['./test/docs/**/*.md', './test/docsBuild', './test/docs', './'], {
      markedOptions: {
        sanitize: true,
      },
    }).then(() => {
      const tree = dirTree('./test/docsBuild');
      expect(tree).toEqual({
        path: './test/docsBuild',
        name: 'docsBuild',
        size: 31772,
        children: [
          {
            path: 'test/docsBuild/README.htm',
            name: 'README.htm',
            extension: '.htm',
            size: 10700,
          },
          {
            path: 'test/docsBuild/subDirectory',
            name: 'subDirectory',
            size: 21072,
            children: [
              {
                path: 'test/docsBuild/subDirectory/page1.htm',
                name: 'page1.htm',
                extension: '.htm',
                size: 10535,
              },
              {
                path: 'test/docsBuild/subDirectory/page2.htm',
                name: 'page2.htm',
                extension: '.htm',
                size: 10537,
              },
            ],
          },
        ],
      });
    })
  );
});
