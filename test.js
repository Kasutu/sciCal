import { makeProperPrefix } from './bin/tools.js';

console.log('testing');

// const plate = 'sin(max(2,3)/3*π)';
// let char = plate.replace(/[0-9]/g, '');
// let num = plate.replace(/\D/g, '');

const properInfix = await makeProperPrefix('sin ( max ( 2, 3 ) / 3 * pi )');

console.log(properInfix);
