import fs from 'fs';

const words = fs.readFileSync('./dicio2.json');
// let data = words.toJSON().data.join(",");
// data = data.replaceAll(",10,", ",34,44,10,34,");
// data = data.split(",");
// data = data.map(num => Number(num));
// const buf = words.toJSON();
// buf.data = data;
// const newBuff = Buffer.from(data);
// fs.writeFileSync('./dicio2.json', newBuff);

const newWords = JSON.parse(words.toString());
const filtered = newWords.words.filter(word => word.length === 5);
// console.log(filtered);

fs.writeFileSync('./termoWords.json', Buffer.from(JSON.stringify(filtered)));