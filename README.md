Crypto Widget Application:
## Deployment

Live Hosting Link: https://coin-paprika-api.vercel.app/

To run locally, CD into my-app and run npm start: http://localhost:3000/


## Tech Stack
Tech Stack: React, JavaScript, Axios, Tailwind, React-Icons


## Related
Notes: The application is completed, closely matching the example given. The Refresh button works but won't always change the displayed data if pressed in quick succession. As the displayed data is set to 2 decimal places, it may take 10-30 seconds or more for a change to occur in the crypto markets.

Converted to component based later on in project it cleans up the code but overall for application of this size it was easy to read with all code in one file also.

Changes: Struggled to find a refresh icon in the direction of the example in react-icons, so a similar symbol facing the other direction was used.

Future improvements: Single GET request to retrieve all required data.

Steps:
-  Set up variables (React, Tailwind) ✔️
- Set up early hosting ✔️
- Test GET request using Postman ✔️
- Write GET requests to access raw information for the 4 requirements (ETH, BTC, USD, and GBP) and successfully console.log(data) ✔️
- Display correct data on the home page from quotes ✔️
- Round the values to 2 decimal places ✔️
- Implement basic layout and styling ✔️
- Add state and onChange handlers for clicks (so Bitcoin and USD display the chosen data) ✔️
- Perfect styling - MVP complete ✔️
- Add refresh tab ✔️
- Code refactoring - made component-based ✔️





