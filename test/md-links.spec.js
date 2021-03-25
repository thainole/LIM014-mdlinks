/* eslint-disable quotes */
const mdLinks = require('../src/index.js');

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  test('returns an array of href, text and file', (done) => {
    mdLinks('../LIM014-mdlinks').then((elem) => {
      const obj = [
        {
          href: 'https://es.wikipedia.org/wiki/Markdown',
          text: 'Markdown',
          file: 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md',
        },
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md',
        },
      ];
      expect(elem).toEqual(obj);
      done();
    });
  });
});
