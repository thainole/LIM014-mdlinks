const { resolvePath, validPath, getMdFiles } = require('../src/api.js');

describe('Resolve Path', () => {
  it('is a function', () => {
    expect(typeof resolvePath).toBe('function');
  });

  it('verifies if a path is absolute', () => {
    const result = 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks';
    expect(resolvePath('D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks')).toStrictEqual(result);
  });

  it('turns a relative path into an absolute one', () => {
    const result = 'D:\\Documentos\\Laboratoria\\Bootcamp\\LIM014-mdlinks';
    expect(resolvePath('../LIM014-mdlinks')).toStrictEqual(result);
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
