const config1 = [["(", ")"]];
const config2 = [
  ["(", ")"],
  ["[", "]"],
];
const config3 = [
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
];
const config4 = [["|", "|"]];
const config5 = [
  ["(", ")"],
  ["|", "|"],
];
const config6 = [
  ["1", "2"],
  ["3", "4"],
  ["5", "6"],
  ["7", "7"],
  ["8", "8"],
];
const config7 = [
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["|", "|"],
];

//Переводим конфиг в словарь '(':')'
function getBracketDictionary(config) {
  let result = {};
  config.forEach((pair) => {
    result[pair[0]] = pair[1];
  });
  return result;
}

//Переводим конфиг в словарь ')':'('
function getReverseBracketDictionary(config) {
  let result = {};
  config.forEach((pair) => {
    result[pair[1]] = pair[0];
  });
  return result;
}

//Так удобнее вытягивать текущую скобочку из стека
function getCurrentBracket() {
  return bracketStack[bracketStack.length - 1];
}

//Словари
let bracketPairs = {};
let bracketPairsReverse = [];

//Стек скобочек
let bracketStack = [];
module.exports = function check(str, bracketsConfig)  {
  
  //Переводим конфиг в словари
  bracketPairs = getBracketDictionary(bracketsConfig);
  bracketPairsReverse = getReverseBracketDictionary(bracketsConfig);
  bracketStack = []
  //Пихаем в стек скобочек первый символ
  bracketStack.push(str[0]);

  //Цикл стартуем с еденицы, а не с нуля. Т.к. первый символ уже загружен в стек
  for (let index = 1; index < str.length; index++) {
    const current = str[index];
    if (bracketPairsReverse[current]) {
      if (current == bracketPairs[getCurrentBracket()]) {
        /*console.log("found closing bracket: " + current);*/
        bracketStack.pop();
      } else {
        if (bracketPairs[current] == bracketPairsReverse[current]) {
          /*console.log("open and close brackets are equal");*/
          bracketStack.push(current);
        } else {
          /*console.log("something is wrong with this bracket: " + current);*/
        return false;
        }
      }
    } else {
      /*console.log("found opening bracket " + current);*/
      bracketStack.push(current);
    }
  }

  return bracketStack.length == 0;
}

/*let result = check('([[[[(({{{}}}(([](((((((())))||||||))))[[{{|{{}}|}}[[[[]]]]{{{{{}}}}}]]))))]]]]))()', config7);
console.log("Result: ", result);
console.log("Bracket Stack:", bracketStack);*/

 

