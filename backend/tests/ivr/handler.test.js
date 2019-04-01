// To run, use: ../node_modules/.bin/jest

const {welcome, menu, recordMessage, askForNumber, endCall } = require('../../src/ivr/handler');

describe('IvrHandler#Welcome', () => {
    it('should serve TwiML with gather', () => {
      const twiml = welcome();
      const count = countWord(twiml);
  
      // TwiML verbs
      expect(count('Gather')).toBe(2);
      expect(count('Say')).toBe(4);
      expect(count('Redirect')).toBe(2);
  
      // TwiML options
      expect(twiml).toContain('action="/ivr/menu"');
      expect(twiml).toContain('numDigits="1"');
      expect(twiml).toContain('/ivr/noMenuResponse');
  
      // TwiML content
      expect(twiml).toContain('Thank you for calling the BigLove hotline. ' +
      'We are unable to answer your call at this moment. ' +
      'Press 1 to leave a message.');

      expect(twiml).toContain('你好！谢谢你称之为大爱。请按1留言。');

    });
});

/**
 * Counts how many times a word is repeated
 * @param {String} paragraph
 * @return {String[]}
 */
function countWord(paragraph) {
    return (word) => {
      const regex = new RegExp(`\<${word}[ | \/?\>]|\<\/${word}?\>`);
      return (paragraph.split(regex).length - 1);
    };
  }