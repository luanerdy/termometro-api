import { readFileSync } from 'fs';

const getWords = (app) => {
  const words = JSON.parse(readFileSync('src/sortedTermoWords.json').toString());

  app.get('/words', (req, res) => {
    const { first, second, third, fourth, fifth, maybes, nones } = req.query;
    const positions = [first, second, third, fourth, fifth];
    let newWords = words;
    newWords = nones ? filterNones(newWords, nones) : newWords;
    newWords = maybes ? filterMaybes(newWords, maybes) : newWords;
    newWords = filterPositions(newWords, positions);
    res.send({words: newWords});
  });

  const filterNones = (words, nones) => {
    return words.filter(word => {
      return word.split('').every(letter => !nones.includes(letter.normalize('NFD').replace(/[\u0300-\u036f]/g, "")));
    })
  };

  const filterMaybes = (words, maybes) => {
    const maybesObj = {};
    maybes.split('').forEach(letter => {
      if(maybesObj[letter] !== undefined) return maybesObj[letter]++;
      maybesObj[letter] = 1;
    });

    return words.filter(word => {
      const wordObj = {};
      word.split('').forEach(letter => {
        const normalizeLetter = letter.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        if(wordObj[normalizeLetter] !== undefined) return wordObj[normalizeLetter]++;
        wordObj[normalizeLetter] = 1;
      });

      return Object.entries(maybesObj).every(maybe => Number(wordObj[maybe[0]]) >= Number(maybe[1]));
    });
  }

  const filterPositions = (words, positions) => {
    return words.filter(word => {
      return word.split('').every((letter, index) => !positions[index] || letter.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === positions[index]);
    });
  }
};

export { getWords };