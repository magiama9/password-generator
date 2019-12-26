# password-generator
Password Generator Homework Repo

## Description

![Application Screenshot](https://github.com/magiama9/password-generator/blob/master/assets/Images/screenshot.png)

This is a tool designed to randomly generate a secure password based on user selected criteria. The program is computed entirely on the user's browser and no information is transmitted back to the server. The user is able to copy the password to the clipboard and utilize in in whatever manner they choose.

Generating a strong, unique password is an essential step in maintaining user and enterprise security. Users re-use passwords across multiple sites and applications, creating an expounding risk if any single site or application is compromised. Convenience is a major hurdle in getting users to implement strong, unique passwords. A password generator such as this removes a barrier and increases user uptake of secure practices.

N.B. Even very secure passwords require good habits to maintain security. Do not reuse passwords across multiple sites and applications and always enable two-factor authentication if a site supports it.

## Technical
The application takes a user's selected criteria and creates a character set and length to use in a password. Utilizing crytographically secure PRNG (psuedo-random number generation), the application randomly selects characters from the applicable character set and outputs a string the user is able to copy and utilize as a password. The application utilizes the methods found below to calculate the resulting entropy (related in bits, with more bits of entropy generally being more secure). True random number generation is not practical on a consumer scale, but the application utilizes in-built methods to javascript to utilize a sufficiently secure seed for the PRNG process.

## Resources
Articles on password generation and password strength calculation.
https://en.wikipedia.org/wiki/Password_strength
https://en.wikipedia.org/wiki/Random_password_generator

Chart of expected time to brute force password - http://i.imgur.com/e3mGIFY.png
