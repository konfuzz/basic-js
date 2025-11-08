const { NotImplementedError } = require('../lib');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  return [...String(n)].reduce((acc, i, j, arr) => {
    const newArr = [...arr];
    newArr.splice(j, 1);
    return (Number(newArr.join('')) > acc) ? Number(newArr.join('')) : acc;
  }, 0);
}

module.exports = {
  deleteDigit
};
