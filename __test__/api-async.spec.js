const {
  validLink,
} = require('../src/api.js');

describe('Validate link', () => {
  test('OK - 200', () => {
    const arr = {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: `${__dirname}\\files\\link.md`,
    };
    const obj = {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: `${__dirname}\\files\\link.md`,
      status: 200,
      message: 'OK',
    };
    return validLink(arr).then((res) => {
      expect(res).toEqual(obj);
    });
  });

  test('FAIL - status', () => {
    const arr = {
      href: 'https://httpstat.us/500',
      text: 'Status 500',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
    };
    const obj = {
      href: 'https://httpstat.us/500',
      text: 'Status 500',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
      status: 500,
      message: 'FAIL',
    };
    return validLink(arr).then((res) => {
      expect(res).toEqual(obj);
    });
  });

  test('FAIL - no status', () => {
    const arr = {
      href: 'https://holasoythais.holaperu/',
      text: 'No funciona',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
    };
    const obj = {
      href: 'https://holasoythais.holaperu/',
      text: 'No funciona',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
      status: 'no status',
      message: 'FAIL',
    };
    return validLink(arr).catch((err) => {
      expect(err).toEqual(obj);
    });
  });
});
