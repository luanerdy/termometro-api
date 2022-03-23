import { readFileSync } from 'fs';

const termoWords = JSON.parse(readFileSync('./termoWords.json').toString());
console.log(termoWords.filter(word => word[2] === 'r'));