const {
  absolutePath,
  validPath,
  getMdFiles,
  getMdLinks,
} = require('../src/api.js');

describe('Resolve Path', () => {
  it('is a function', () => {
    expect(typeof absolutePath).toBe('function');
  });

  it('Returns the same path if it is absolute', () => {
    const result = `${__dirname}/__test__/files`;
    expect(absolutePath(`${__dirname}/__test__/files`)).toStrictEqual(result);
  });
  it('Resolves the path if it is relative', () => {
    const result = `${__dirname}\\files`;
    expect(absolutePath('./__test__/files')).toStrictEqual(result);
  });
});

describe('Valid Path', () => {
  it('is a function', () => {
    expect(typeof validPath).toBe('function');
  });

  it('verifies if a path is valid', () => {
    const result = true;
    expect(validPath(`${__dirname}\\files`)).toStrictEqual(result);
  });
});

describe('Get md files', () => {
  it('is a function', () => {
    expect(typeof getMdFiles).toBe('function');
  });

  it('verifies if the path is a directory, analize the content and returns only the mdfiles in an array', () => {
    const result = [
      `${__dirname}\\files\\fail\\failed-links.md`,
      `${__dirname}\\files\\link.md`,
      `${__dirname}\\files\\no-link.md`,
    ];
    expect(getMdFiles(`${__dirname}\\files`)).toStrictEqual(result);
  });

  it('verifies if the path is a file md and returns it in an array', () => {
    const result = [`${__dirname}\\files\\link.md`];
    expect(getMdFiles(`${__dirname}\\files\\link.md`)).toStrictEqual(result);
  });
});

describe('Get md links', () => {
  it('is a function', () => {
    expect(typeof getMdLinks).toBe('function');
  });

  it('Put the links in an array, with the href, text and file', () => {
    const result = [
      {
        href: 'https://nodejs.org/',
        text: 'Node.js',
        file: `${__dirname}\\files\\link.md`,
      },
    ];
    expect(getMdLinks([`${__dirname}\\files\\link.md`])).toEqual(result);
  });
});
