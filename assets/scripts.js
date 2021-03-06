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
var lengthElem = document.getElementById("validationDefault05");
var entropyElem = document.getElementById("entropy");
var timeToCrackElem = document.getElementById("crack-time");
var copyElem = document.getElementById("copy-button");
var cryptoType = null;
var generatedPassword = null;

// Sets the correct version of cryptographic methods to use based on browser method availability.
function chooseCrypto() {
  if ("crypto" in window) {
    cryptoType = crypto;
  } else if ("msCrypto" in window) {
    cryptoType = msCrypto;
  } else {
    return;
  }
}

// Creates a string containing the concatenation of the user selected check boxes
function createCharSetString() {
  var charSetString = "";
  if (numbersElem.checked) {
    charSetString += characterSets[0][2];
  }
  if (lowercaseElem.checked) {
    charSetString += characterSets[1][2];
  }
  if (uppercaseElem.checked) {
    charSetString += characterSets[2][2];
  }
  if (symbolsElem.checked) {
    charSetString += characterSets[3][2];
  }
  if (spacesElem.checked) {
    charSetString += characterSets[4][2];
  }
  return charSetString;
}

// Converts a string into an array of characters usable by the PRNG function
// If the user hasn't selected any checkboxes, alert them and stop the function.
function createCharSet(str) {
  var charSet = [];
  for (var i = 0; i < str.length; i++) {
    if (charSet.indexOf(str.charAt(i)) === -1) {
      charSet.push(str.charAt(i));
    }
  }
  if (charSet.length > 0) {
    return charSet;
  } else {
    alert(
      "Character set is empty. Please select characters to use before generating a password"
    );
    return null;
  }
}

function makePasswordEvent(event) {
  event.preventDefault();

  // Generate character set as a string, convert it to an array, then store it.
  var charset = createCharSet(createCharSetString());
  if (charset.length == 0) {
    alert("Character set is empty");
    return;
  }

  // Calculate desired length by returning an integer value in base 10
  var length;
  length = parseInt(lengthElem.value, 10);
  /* Check user selected length
  There is form validation to ensure the user selects a length
  This ensures that the user selected length is valid */
  if (isNaN(length)) {
    alert("Password length must be a number between 2 and 128.");
    return;
  } else if (length < 2) {
    alert("Password length must be between 2 and 128 characters.");
    return;
  } else if (length > 128) {
    alert("Password is too large. Select a more reasonable value.");
    return;
  }

  // Generate password
  generatedPassword = makePassword(charset, length);

  // Create output text and place into the current form.
  passwordElem.placeholder = generatedPassword;

  // enable the copy to clipboard button
  copyElem.disabled = false;

  // Calculate password entropy, round to 2 decimal points, and display it to the user.
  var entropy = (Math.log(charset.length) * length) / Math.log(2);
  var entropyShort = entropy.toFixed(2);
  entropyElem.placeholder =
    "Your password contains " + entropyShort + " bits of entropy";
  entropyElem.style = "display:block";

  // Calculate time to crack password utilizing calculated entropy, and display it to the user.
  timeToCrackElem.placeholder = timeToCrack(entropy);
  timeToCrackElem.style = "display:block";
}

/* Uses whichever browser crypto method is available to
generate a random number from 0 to n.
len is the length of password to output */
function makePassword(charset, len) {
  var result = "";
  for (var i = 0; i < len; i++) {
    result = result + charset[randomInt(charset.length)];
  }
  return result;
}

// Seeds the useCrypto function with a starting value.
function randomInt(n) {
  var x = Math.floor(Math.random() * n);
  x = (x + useCrypto(n)) % n;
  return x;
}

/* Uses browser based encryption type to pseudo-randomly generate a secure value.
Ensures value is able to be stored (4294967296 is (2^32 -1) */
function useCrypto(num) {
  if (cryptoType === null) {
    return 0;
  } else var arr = new Uint32Array(1);
  do cryptoType.getRandomValues(arr);
  while (arr[0] - (arr[0] % num) > 4294967296 - num);
  return arr[0] % num;
}

/* Copies the generated password to the clipboard.
This method may or may not work on firefox based browsers.*/

function doCopy() {
  navigator.clipboard.writeText(generatedPassword);
}

/* Determine a time to crack password via brute force with user's 
available processor threads and average clock speed. 

Guaranteed time to crack is calculated as 
(Seconds to Guaranteed Crack) = (2^(entropy)) / (Guesses per Second)

FLOPS(equivalent to guesses per second) are calculated based on Intel's 
latest architecture(32 FP operations per processor cycle), 
an average clock speed of 2.0 ghz, and the number of threads available.

FLOPS = (threads) * (cycles per second) * (FLOPS per cycle)
*/

function timeToCrack(entropy) {
  var threads = navigator.hardwareConcurrency;
  const speed = 2000000000;
  var flops = threads * speed * 32;
  var secondsToCrack = Math.pow(2, entropy) / flops;
  var minutesToCrack = secondsToCrack / 60;
  var hoursToCrack = minutesToCrack / 60;
  var daysToCrack = hoursToCrack / 24;
  var yearsToCrack = daysToCrack / 365;

  if (minutesToCrack < 1) {
    return (
      "Your computer would be able to crack this password in " +
      secondsToCrack.toFixed(2) +
      " seconds"
    );
  } else if (hoursToCrack < 1) {
    return (
      "Your computer would be able to crack this password in " +
      minutesToCrack.toFixed(2) +
      " minutes."
    );
  } else if (daysToCrack < 1) {
    return (
      "Your computer would be able to crack this password in " +
      hoursToCrack.toFixed(2) +
      " hours."
    );
  } else if (yearsToCrack < 1) {
    return (
      "Your computer would be able to crack this password in " +
      daysToCrack.toFixed(2) +
      " days."
    );
  } else {
    return (
      "Your computer would be able to crack this password in " +
      yearsToCrack.toFixed(2) +
      " years."
    );
  }
}
