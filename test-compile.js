import complier from './src/index.js';
import { readFileSync } from 'fs';

console.log(complier(readFileSync('./design/each.tpl', 'utf-8'), { test: true }));
console.log(complier(readFileSync('./design/event.tpl', 'utf-8'), { test: true }));