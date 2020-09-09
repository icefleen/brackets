module.exports = function check(str, bracketsConfig) {
  let opened_brackets_stack = [];

  let config = {};

  for (let brackets of bracketsConfig) {
    if (brackets[0] !== brackets[1]) {
      config[brackets[0]] = {
        isOpenBracket: true,
        isCloseBracket: false,
        closingBracket: brackets[1],
        openingBracket: null
      }
  
      config[brackets[1]] = {
        isOpenBracket: false,
        isCloseBracket: true,
        closingBracket: null,
        openingBracket: brackets[0]
      }
    } else {
      config[brackets[0]] = {
        isOpenBracket: true,
        isCloseBracket: true,
        closingBracket: brackets[0],
        openingBracket: brackets[0]
      }
    }
  }

  for (let bracket of str) {
    if (config[bracket].isOpenBracket && config[bracket].isCloseBracket) {
      if (opened_brackets_stack[opened_brackets_stack.length - 1] === bracket) {
        opened_brackets_stack.pop();
      } else {
        opened_brackets_stack.push(bracket);
      }
    } else if (config[bracket].isOpenBracket) {
      opened_brackets_stack.push(bracket);
    } else if (config[bracket].isCloseBracket) {
      if (opened_brackets_stack.length === 0) return false;
      if (config[opened_brackets_stack.pop()].closingBracket !== bracket) return false;
    }
  }

  return opened_brackets_stack.length === 0;
}
