# password-generator
Password Generator Homework Repo

## Description
This is a tool designed to randomly generate a secure password based on user selected criteria. The program is computed entirely on the user's browser and no information is transmitted back to the server. The user is absle to copy the password to the clipboard and utilize in in whatever manner they choose.

Generating a strong, unique password is an essential step in maintaining user and enterprise security. Users re-use passwords across multiple sites and applications, creating an expounding risk if any single site or application is compromised. Convenience is a major hurdle in getting users to implement strong, unique passwords. A password generator such as this removes a barrier and increases user uptake of secure practices.

## Technical
The application takes a user's selected criteria and creates a character set and length to use in a password. Utilizing crytographically secure PRNG (psuedo-random number generation), the application randomly selects characters from the applicable character set and outputs a string the user is able to copy and utilize as a password. The application utilizes the methods found below to calculate the resulting entropy (related in bits, with more bits of entropy generally being more secure). True random number generation is not practical on a consumer scale, but the application utilizes in-built methods to javascript to utilize a sufficiently secure seed for the PRNG process.

## Resources
Articles on password generation and password strength calculation.
https://en.wikipedia.org/wiki/Password_strength
https://en.wikipedia.org/wiki/Random_password_generator
