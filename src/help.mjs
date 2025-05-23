export default function (rl, print) {
    return function () {
        print.info("\nHow to use this CLI :");
        print.normal("help      ~> CLI Usage guide.")
        print.normal("menu      ~> Back to CLI main menu.");
        print.normal("sr-check  ~> Open Utilitis Check a Zelio SR by code Spectification. ");
        print.normal("plc-check ~> Open Utilitis Check a Omron PLC by code Spectification.");
        print.normal("exit      ~> Exit the CLI.\n");
        rl.prompt()
    }
}