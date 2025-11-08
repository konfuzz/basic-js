const { NotImplementedError } = require('../lib');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */

function encodeLine(str) {
  return [...str].reduce((acc, c, i, arr) => {
    if (arr[i + 1] === c) {
      acc.count += 1
      return acc;
    } else {
      acc.res += acc.count > 1 ? acc.count + c : c;
      acc.count = 1;
      return acc;
    }
  }, { count: 1, res: '' }).res;
}

module.exports = {
  encodeLine
};
