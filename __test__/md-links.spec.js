/* eslint-disable quotes */
const mdLinks = require('../src/index.js');

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });
  test('returns an array of href, text and file', () => {
    const obj = [
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: `${__dirname}\\files\\link.md`,
      },
    ];
    expect(mdLinks('./__test__/files/link.md')).resolves.toEqual(obj);
  });

  test('returns an array of href, text and file when option is false', () => {
    const obj = [
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: `${__dirname}\\files\\link.md`,
      },
    ];
    expect(mdLinks('./__test__/files/link.md', { validate: false })).resolves.toEqual(obj);
  });

  test('returns an array of all when option validate is true', () => {
    const obj = [{
      file: `${__dirname}\\files\\link.md`,
      href: 'https://nodejs.org/',
      message: 'OK',
      status: 200,
      text: 'Node.js',
    }];
    expect(mdLinks('./__test__/files/link.md', { validate: true })).resolves.toEqual(obj);
  });

  test('returns an error when path is not valid', () => {
    const err = 'The path is not valid. Try with another one.';
    return mdLinks('./link.md', { validate: true }).catch((error) => {
      expect(error).toEqual(err);
    });
  });
});
