const { resolvePath, validPath, getMdFiles } = require('../src/api.js');

describe('hola', () => {
  it('is a function', () => {
    expect(typeof resolvePath).toBe('function');
  });

  it('qué hace', () => {
    const result = ['a'];
    expect(resolvePath('path')).toStrictEqual(result);
  });
});

describe('hola', () => {
  it('is a function', () => {
    expect(typeof validPath).toBe('function');
  });

  it('qué hace', () => {
    const result = ['a'];
    expect(validPath('path')).toStrictEqual(result);
  });
});

describe('hola', () => {
  it('is a function', () => {
    expect(typeof getMdFiles).toBe('function');
  });

  it('qué hace', () => {
    const result = ['a'];
    expect(getMdFiles('path')).toStrictEqual(result);
  });
});
