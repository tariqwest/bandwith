const randomIntExclusive = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const randomChoices = (array, numberOfChoices) => {
  const result = [];
  for (let i = 0; i < numberOfChoices; i++) {
    result.push(array[randomIntExclusive(0, array.length)]);
  }
  return result;
};

module.exports = {
  randomChoices,
  randomIntExclusive,
};
