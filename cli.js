(function() {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //const blabla = require("filväg");
    const addUser = require('./src/addUser.js');
    const shareAccount = require('./src/shareAccount.js');
    const showAccounts = require('./src/showAccounts.js');
    const showInterest = require('./src/showInterest.js');

    rl.setPrompt("Choice: ");
    rl.prompt();

    rl.on("exit", process.exit);
    rl.on("line", async (line) => {
        line = line.trim();
        let lineArray = line.split(" ");

        line = lineArray[0];
        console.log(lineArray);
        switch (line) {
            case "exit":
                process.exit();
                break;
            case "menu":
                printMenu();
                break;
            case "addCustomer":
                await addUser.add(lineArray[1], lineArray[2], lineArray[3],
                    lineArray[4], lineArray[5], lineArray[6]);
                break;
            case "shareAccount":
                await shareAccount.share(lineArray[1], lineArray[2]);
                break;
            case "showAccounts":
                await showAccounts.show();
                break;
            case "showInterest":
                await showInterest.show(lineArray[1]);
                break;
            default:
                console.log("No command like that exists");
                printMenu();
                break;
        }
        rl.prompt();
    });
})();

function printMenu() {
    console.log(
        "The following commands exists:\n"
          + "exit                                                     "
          +  "  = Closes the program\n"
          + "menu                                                     "
          + "  = Opens the menu of choices\n"
          + "addCustomer<Fornamn><Efternamn><Fodd><Adress><Ort><Pinkod> "
          + "= Add a customer to bank\n"
          + "shareAccount<kundId><KontoId>                            "
          + "  = Opens the menu of choices\n"
          + "showAccounts                                             "
          + "  = Shows all account holders with their accounts\n"
          + "showInterest                                             "
          + " = Shows the accumulated interest together with the accounts"
    );
}
