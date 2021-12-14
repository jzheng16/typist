import faker from 'faker';
import { v4 as uuidv4 } from 'uuid';

export const generateNewSentence = () => {
  const words = faker.lorem.words(10).split(' ');
  const wordsWithSpaces = words.map((word, i) => {
    if (i === 0) {
      word = word[0].toUpperCase() + word.slice(1);
    }
    if (i !== words.length - 1) {
      word = word + ' ';
    }
    if (i === words.length - 1) {
      word = word + '.';
    }
    return word;
  })
  return wordsWithSpaces;
  // put into an array of words each (space included)
}

export const generateUniqueId = () => {
  return uuidv4();
}