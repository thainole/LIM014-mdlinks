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
    const result = 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks';
    expect(absolutePath('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks')).toStrictEqual(result);
  });
  it('Resolves the path if it is relative', () => {
    const result = 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks';
    expect(absolutePath('../LIM014-mdlinks')).toStrictEqual(result);
  });
});

describe('Valid Path', () => {
  it('is a function', () => {
    expect(typeof validPath).toBe('function');
  });

  it('verifies if a path is valid', () => {
    const result = true;
    expect(validPath('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks')).toStrictEqual(result);
  });
});

describe('Get md files', () => {
  it('is a function', () => {
    expect(typeof getMdFiles).toBe('function');
  });

  it('verifies if the path is a directory, analize the content and returns only the mdfiles in an array', () => {
    const result = ['D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md'];
    expect(getMdFiles('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks')).toStrictEqual(result);
  });
});

describe('Get md links', () => {
  it('is a function', () => {
    expect(typeof getMdLinks).toBe('function');
  });

  it('Put the links in an array, with the href, text and file', () => {
    const result = [
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
    expect(getMdLinks(['D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks\\README.md'])).toStrictEqual(result);
  });

  it('Throws an empty array', () => {
    const result = [];
    expect(getMdLinks(['D:\\Carpeta\\primer-archivo.md'])).toStrictEqual(result);
  });
});
