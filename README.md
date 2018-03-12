# internetbanken

This project is a part of the course "Webbprogrammering och databaser (PA1444)"

[HOW TO USE]

1. Open terminal and go to the project directory
2. Start server with "node index.js", or "node cli.js" for Command-Line tools
3. The server starts on port 1337
4. Open your browser and input "localhost:1337/bank/index" to access the web interface

[AVALIBLE ROUTES]

bank/index
bank/login
bank/customerList
bank/register
bank/register/complete
bank/login
bank/logout
bank/accounts
bank/view-account/:id
bank/transfer-money/:id
bank/deposit
bank/swish
bank/swish-complete
bank/swish-failed

[REQUIRED NODE MODULES]
  mysql
  promise-mysql
  express
  express-sessions
