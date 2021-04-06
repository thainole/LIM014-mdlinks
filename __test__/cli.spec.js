const {
  statsOnly,
  brokenLinks,
} = require('../src/cli.js');

describe('Stats Only', () => {
  it('is a function', () => {
    expect(typeof statsOnly).toBe('function');
  });

  it('return the statistics of the links (total and unique)', () => {
    const obj = [{
      file: `${__dirname}\\files\\link.md`,
      href: 'https://nodejs.org/',
      message: 'OK',
      status: 200,
      text: 'Node.js',
    }];
    const result = 'Total: 1\nUnique: 1';
    expect(statsOnly(obj)).toStrictEqual(result);
  });
});

describe('Broken Links', () => {
  it('is a function', () => {
    expect(typeof brokenLinks).toBe('function');
  });

  it('return the number of broken links', () => {
    const obj = [{
      href: 'https://httpstat.us/500',
      text: 'Status 500',
      file: `${__dirname}\\files\\fail\\failed-links.md`,
      status: 500,
      message: 'FAIL',
    }];
    const result = 'Broken: 1';
    expect(brokenLinks(obj)).toStrictEqual(result);
  });
});
