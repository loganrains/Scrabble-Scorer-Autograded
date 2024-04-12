// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
}

function initialPrompt() {
   // console.log("Let's play some scrabble! Enter a word:");
   console.log("Let's play some scrabble!")
   let word = input.question(`\nEnter a word to score or QUIT to stop: `);
   
   // Word clean up v
   word =  word.trim();

   //User Verification - Single word v
   while (true) {
      if (!word.includes(" ")) {
         break;
      } else {
         word = input.question(`Please enter a single word: `)
      }
   }
   
   return word;
};

let simpleScorer = function (word) {
   let score = 0;
   score += word.length;
   return score;
}

let vowelBonusScorer = function (word) {
   let score = 0;
   let vowel = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];

   for (let i = 0; i < word.length; i++){
      if (vowel.indexOf(word[i]) + 1){
         score += 3
      } else {
         score += 1
      }
   }
   return score;
}

let newPointStructure = transform(oldPointStructure);

function scrabbleScorer (word) {
   let score = 0;
   wordLower = word.toLowerCase();

   for (let i = 0; i < wordLower.length; i++){
      score += newPointStructure[wordLower[i]]
   }

   return score;
}

let simple = {
   name : "Simple Score",
   description : "Each letter is worth 1 point.",
   scorerFunction : simpleScorer,
}

let vowelBonus = {
   name : "Bonus Vowels",
   description : "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction : vowelBonusScorer,
}

let scrabble = {
   name : "Scrabble",
   description : "The traditional scoring algorithm.",
   scorerFunction : scrabbleScorer,
}

const scoringAlgorithms = [simple, vowelBonus, scrabble];

function scorerPrompt() {
   let scorer = input.question(`Which scoring algorithm would you like to use?
   
1 - ${simple.name}: ${simple.description}
2 - ${vowelBonus.name}: ${vowelBonus.description}
3 - ${scrabble.name}: ${scrabble.description}
Enter 1, 2, or 3: `);

   while (true) {
      if (scorer < 1 || scorer > 3) {
         scorer = input.question(`Please enter 1, 2, or 3: `)
      } else {
         break;
      }
   }

   scorer -= 1;

   return scoringAlgorithms[scorer];
};

function transform (Obj) {
   newObject = {};
   
   for (pointVal in Obj) {     
      for (let i = 0; i < Obj[pointVal].length; i++){
         newObject[Obj[pointVal][i].toLowerCase()] = Number(pointVal)
      }
   }

   return newObject
}

function runProgram() {
   while (true){
      let scrabbleWord = initialPrompt();
      if (scrabbleWord === "QUIT"){
         break;
      }
   let scorer = scorerPrompt();
   console.log(`\nScore for '${scrabbleWord}': ${scorer.scorerFunction(scrabbleWord)}`)

   let lineBreak = ("-");
   console.log(lineBreak.repeat(35) + "\n\n");
   }
}

module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};