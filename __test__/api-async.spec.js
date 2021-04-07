jest.mock('node-fetch');
const fetch = require('node-fetch');

const { validLink } = require('../src/api.js');

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
    fetch.mockImplementation(() => Promise.resolve({
      status: 200,
      statusText: 'OK',
    }));
    return validLink(arr).then((res) => {
      expect(res).toEqual(obj);
    });
  });

  test('FAIL - status', () => {
    const arr = {
      href: 'https://abc.github.io/assets404/',
      text: 'Github fail',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
    };
    const obj = {
      href: 'https://abc.github.io/assets404/',
      text: 'Github fail',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
      status: 404,
      message: 'FAIL',
    };
    fetch.mockImplementation(() => Promise.resolve({
      status: 404,
      statusText: 'Not Found',
    }));
    return validLink(arr).then((res) => {
      expect(res).toEqual(obj);
    });
  });

  test('FAIL - no status', () => {
    const arr = {
      href: 'https://helloeveryone.imjanedoe/',
      text: 'Failed Link',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
    };
    const obj = {
      href: 'https://helloeveryone.imjanedoe/',
      text: 'Failed Link',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
      status: 'no status',
      message: 'FAIL',
    };
    // eslint-disable-next-line prefer-promise-reject-errors
    fetch.mockImplementation(() => Promise.reject({}));
    return validLink(arr).catch((err) => {
      expect(err).toEqual(obj);
    });
  });
});
