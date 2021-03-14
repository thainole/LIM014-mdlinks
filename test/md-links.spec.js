const mdLinks = require('../src/index.js');

describe('mdLinks', () => {
  it('is a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('returns an array of the md files', () => {
    const result = [
      '\\Carpeta\\Carpeta-1\\cuarto-archivo-links.md',
      '\\Carpeta\\Carpeta-1\\tercer-archivo.md',
      '\\Carpeta\\primer-archivo.md',
      '\\Carpeta\\segundo-archivo-links.md',
    ];
    expect(mdLinks('/Carpeta')).toEqual(result);
  });
});
