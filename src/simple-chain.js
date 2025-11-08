const { decorateObject } = require('../lib');
const { NotImplementedError } = require('../lib');

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value) {
    const stringValue = value === undefined ? '' : String(value);
    this.chain.push(stringValue);
    return this;
  },

  removeLink(value) {
    if (typeof value !== 'number' ||
      !Number.isInteger(value) ||
      value < 1 ||
      value > this.chain.length) {
      this.chain = [];
      throw new Error("You can't remove incorrect link!");
    }

    this.chain.splice(value - 1, 1);
    return this;
  },

  reverseChain() {
    this.chain.reverse();
    return this;
  },

  finishChain() {
    const result = this.chain.map(value => `( ${value} )`).join('~~');
    this.chain = [];

    return result;
  }
};

module.exports = {
  chainMaker,
};
