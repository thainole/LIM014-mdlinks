const { spawn } = require('child_process');

const execute = (comand, args = []) => {
  const createProcess = spawn(comand, args, { shell: process.platform === 'win32' });
  return new Promise((resolve, reject) => {
    createProcess.stdout.on('data', (data) => resolve(data.toString()));
    createProcess.stderr.on('data', (data) => reject(data.toString()));
    createProcess.on('exit', (code) => resolve(code));
  });
};

describe('Command line interface on global.js', () => {
  test('Path with no option', () => {
    execute('md-links', [`${__dirname}\\files\\link.md`]).then((res) => {
      expect(res).toBe('..\\__test__\\files\\link.md  https://nodejs.org/  Node.js\n');
    });
  });

  test('Path with validate flag', () => {
    execute('md-links', [`${__dirname}\\files\\link.md`, '--validate']).then((res) => {
      expect(res).toBe('..\\__test__\\files\\link.md  https://nodejs.org/  OK  200  Node.js\n');
    });
  });

  test('Path with stats flag', () => {
    execute('md-links', [`${__dirname}\\files\\link.md`, '--stats']).then((res) => {
      expect(res).toBe('Total: 1\nUnique: 1\n');
    });
  });

  test('Path with stats and validate flags', () => {
    execute('md-links', [`${__dirname}\\files\\link.md`, '--stats --validate']).then((res) => {
      expect(res).toBe('Total: 1\nUnique: 1\nBroken: 0\n');
    });
  });

  test('Path with wrong flag', () => {
    execute('md-links', [`${__dirname}\\files\\link.md`, '--hello']).then((res) => {
      expect(res).toBe('Try with --stats, --validate or both (--stats --validate).\nIn case you need some help, try with --help.\n');
    });
  });

  test('Path with help flag', () => {
    execute('md-links', [`${__dirname}\\files\\link.md`, '--help']).then((res) => {
      expect(typeof res).toBe('string');
    });
  });
});
