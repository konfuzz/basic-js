const { NotImplementedError } = require('../lib');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(type) {
    this.reversed = type === false ? true : false;
  }

  keyToShifts(key) {
    const upperCased = key.toUpperCase();
    return [...upperCased].map(c => {
      const charCode = c.charCodeAt(0);
      return charCode - 65;
    })
  }

  encode(letter, shift) {
    const charCode = letter.charCodeAt(0);
    return String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
  }

  decode(letter, shift) {
    const charCode = letter.charCodeAt(0);
    return String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
  }

  process(operation, string, key) {
    if (string === undefined || key === undefined) throw Error('Incorrect arguments!');

    const func = operation === 'encrypt' ? this.encode : this.decode;

    const shifts = this.keyToShifts(key);
    const upperCased = string.toUpperCase();

    let res = '';
    let counter = 0;

    for (let i = 0; i < string.length; i++) {
      if (/[A-Z]/.test(upperCased[i])) {
        const shiftIndex = counter % shifts.length;
        const shift = shifts[shiftIndex];
        res += func(upperCased[i], shift);
        counter++;
      } else {
        res += upperCased[i]
      }
    }

    return this.reversed ? [...res].reverse().join('') : res;
  }

  encrypt(string, key) {
    return this.process('encrypt', string, key);
  }

  decrypt(string, key) {
    return this.process('decrypt', string, key);
  }
}

module.exports = {
  directMachine: new VigenereCipheringMachine(),
  reverseMachine: new VigenereCipheringMachine(false),
  VigenereCipheringMachine,
};
