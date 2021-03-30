#!/usr/bin/env node

// Grab provided args
const [,, ...args] = process.argv;

// Print hello world provided args
console.log(`Hello World ${args}`);

// Se ve como consola en ./src/cli.js
// Debería crear otro módulo para poner ya todo ? o solo en este
