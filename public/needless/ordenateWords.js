import { readFileSync, writeFileSync } from 'fs';

const words = JSON.parse(readFileSync('./termoWords.json').toString());

const normalizeWord = (str) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

const alfabeto = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s", "t", "u","v","w","x","y","z"];

const pontuacao = {"a": {},"b": {},"c": {},"d": {},"e": {},"f": {},"g": {},"h": {},"i": {},"j": {},"k": {},"l": {},"m": {},"n": {},"o": {},"p": {},"q": {},"r": {},"s": {}, "t": {}, "u": {},"v": {},"w": {},"x": {},"y": {},"z": {}};

alfabeto.forEach(letra => {
  let counter = 0;
  let first = 0;
  let second = 0;
  let third = 0;
  let fourth = 0;
  let fifth = 0;

  words.forEach(word => {
    word[0] === letra && first++;
    word[1] === letra && second++;
    word[2] === letra && third++;
    word[3] === letra && fourth++;
    word[4] === letra && fifth++;

    for(let i = 0; i < 5; i++) {
      if(word[i] === letra) counter++;
    }
  });

  pontuacao[letra].ocurrencies = counter;
  pontuacao[letra][0] = first;
  pontuacao[letra][1] = second;
  pontuacao[letra][2] = third;
  pontuacao[letra][3] = fourth;
  pontuacao[letra][4] = fifth;
});

const insert = (arr, index, newItem) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index)
];

const palavrasPontuadas = [];
const totalLetters = words.length * 5;

words.forEach(word => {
  let points = 1;
  const letters = [];
  for(let i = 0; i < 5; i++) {
    const letter = word[i];
    const letterObj = pontuacao[letter.normalize('NFD').replace(/[\u0300-\u036f]/g, "")];
    const isFirst = !letters.includes(letter);
    const occurProb = letterObj.ocurrencies / totalLetters;
    const positionProb = letterObj[i] / totalLetters;
    letters.push(letter);

    if(isFirst) {
      points *= (occurProb + positionProb);
    }
    else {
      points *= positionProb;
    }
  }
  palavrasPontuadas.push({word, points});
});

const sortedWords = palavrasPontuadas.sort((a, b) => {
  return b.points - a.points;
});

const sortedWordsArray = sortedWords.map(wordObj => wordObj.word);

writeFileSync('./sortedTermoWords.json', Buffer.from(JSON.stringify(sortedWordsArray)));

console.log(sortedWordsArray);
