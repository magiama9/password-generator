/* Password Generator Script

#Pseudocode

Take password criteria from the user
Length, character types used
**Output the level of security of their selected criteria?**

Randomly generate string of selected length matching user criteria

Output the string to the user's display

Allow the user to copy the string

Erase the string from memory/screen and allow the user to generate a new password */

// Character Sets
var characterSets = [
  [true, "Numbers", "0123456789"],
  [true, "Lowercase", "abcdefghijklmnopqrstuvwxyz"],
  [true, "Uppercase", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
  [false, "symbols", "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"],
  [false, "Space", " "]
];

// For interacting with nodes/elements of the DOM

var passwordElem = document.getElementById("password");
var numbersElem = document.getElementById("numbersCheckbox");
var lowercaseElem = document.getElementById("lowercaseCheckbox");
var uppercaseElem = document.getElementById("uppercaseCheckbox");
var symbolsElem = document.getElementById("symbolsCheckbox");
var spacesElem = document.getElementById("spacesCheckbox");
var copyElem = document.getElementById("copy-button");
var cryptoType = null;
var generatedPassword = null;

function chooseCrypto() {
  if ("crypto" in window) {
    cryptoType = crypto;
  } else if ("msCrypto" in window) {
    cryptoType = msCrypto;
  } else {
    return;
  }
}

function createCharSet() {
  var charSetString = "";
  if (numbersElem.checked) {
    console.log("Numbers is Checked");
    charSetString += characterSets[0][2];
    console.log(charSetString);
  }
  if (lowercaseElem.checked) {
    console.log("Lowercase is Checked");
    charSetString += characterSets[1][2];
    console.log(charSetString);
  }
  if (uppercaseElem.checked) {
    console.log("Uppercase is Checked");
    charSetString += characterSets[2][2];
    console.log(charSetString);
  }
  if (symbolsElem.checked) {
    console.log("Symbols is Checked");
    charSetString += characterSets[3][2];
    console.log(charSetString);
  }
  if (spacesElem.checked) {
    console.log("Spaces is Checked");
    charSetString += characterSets[4][2];
    console.log(charSetString);
  }
}

createCharSet();
