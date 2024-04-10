// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

// Don't change name v
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

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// Don't change name v
function initialPrompt() {
   // console.log("Let's play some scrabble! Enter a word:");
   console.log("Let's play some scrabble!")
   let word = input.question(`\nEnter a word to score: `);
   
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

// Don't change name v
function simpleScorer (word) {
   let score = 0;
   score += word.length;
   console.log(`\nScore for '${word}': ${score}`)
   return score;
}

// Don't change name v
function vowelBonusScorer (word) {
   let score = 0;
   let vowel = ["A", "E", "I", "O", "U", "a", "e", "i", "o", "u"];

   for (let i = 0; i < word.length; i++){
      if (vowel.indexOf(word[i]) + 1){
         score += 3
      } else {
         score += 1
      }
   }
   console.log(`\nScore for '${word}': ${score}`)
   return score;
}

function scrabbleScorer () {

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
   scorerFunction : oldScrabbleScorer,
}

// Don't change name v
const scoringAlgorithms = [simple, vowelBonus, scrabble];

// Don't change name v
function scorerPrompt() {
   let scorer = input.question(`Which scoring algorithm would you like to use?
   
1 - ${simple.name}: ${simple.description}
2 - ${vowelBonus.name}: ${vowelBonus.description}
3 - ${scrabble.name}: ${scrabble.description}
Enter 1, 2, or 3: `);

   //User Verification - 1, 2, or 3
   while (true) {
      if (scorer < 1 || scorer > 3) {
         scorer = input.question(`Please enter 1, 2, or 3: `)
      } else {
         break;
      }
   }

   // Convert to index v
   scorer -= 1;

   return scoringAlgorithms[scorer];
};

// Don't change name v
function transform() {};

let newPointStructure;

function runProgram() {
   let scrabbleWord = initialPrompt();
   let scorer = scorerPrompt()
   scorer.scorerFunction(scrabbleWord)


   // console.log(oldScrabbleScorer(scrabble)); <-- Task 1

   // Simple scoring Test v
   // console.log("algorithm name: ", scoringAlgorithms[0].name);
   // console.log("scoringFunction result: ", scoringAlgorithms[0].scorerFunction("JavaScript"));

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
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
