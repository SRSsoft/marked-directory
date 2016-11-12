/* eslint-disable no-undef,no-console */
const expect = require('expect');
const md = require('../index.js');
const dirTree = require('directory-tree');
const rimraf = require('rimraf');

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
      const tree = dirTree('./test/docsBuild');
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
                    size: 10699,
                    extension: '.htm',
                  },
                  {
                    path: 'test/docsBuild/test/docs/subDirectory',
                    name: 'subDirectory',
                    children: [
                      {
                        path: 'test/docsBuild/test/docs/subDirectory/page1.htm',
                        name: 'page1.htm',
                        size: 10534,
                        extension: '.htm',
                      },
                      {
                        path: 'test/docsBuild/test/docs/subDirectory/page2.htm',
                        name: 'page2.htm',
                        size: 10536,
                        extension: '.htm',
                      },
                    ],
                    size: 21070,
                  },
                ],
                size: 31769,
              },
            ],
            size: 31769,
          },
        ],
        size: 31769,
      });
    })
  );


  it('should transform a directory and remove unnecessary sub directories', () =>
    md(['./test/docs/**/*.md', './test/docsBuild', './test/docs', './']).then(() => {
      const tree = dirTree('./test/docsBuild');
      expect(tree).toEqual({
        path: './test/docsBuild',
        name: 'docsBuild',
        children: [
          {
            path: 'test/docsBuild/README.htm',
            name: 'README.htm',
            size: 10699,
            extension: '.htm',
          },
          {
            path: 'test/docsBuild/subDirectory',
            name: 'subDirectory',
            children: [
              {
                path: 'test/docsBuild/subDirectory/page1.htm',
                name: 'page1.htm',
                size: 10534,
                extension: '.htm',
              },
              {
                path: 'test/docsBuild/subDirectory/page2.htm',
                name: 'page2.htm',
                size: 10536,
                extension: '.htm',
              },
            ],
            size: 21070,
          },
        ],
        size: 31769,
      });
    })
  );
});
