(function() {
    const readline = require("readline");
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    //const blabla = require("filväg");

    rl.setPrompt("Choice: ");
    rl.prompt();

    rl.on("exit", process.exit);
    rl.on("line", async (line) => {
        line = line.trim();
        let lineArray = line.split(" ");

        line = lineArray[0];
        switch (line) {
            case "exit":
                process.exit();
                break;
            case "menu":
                printMenu();
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
          + "exit       = Closes the program\n"
          + "menu       = Opens the menu of choices\n"
      );
}
