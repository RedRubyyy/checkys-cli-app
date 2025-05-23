export default async function (print , delay) {
    print.info("\nWellcome to Checking Command Line Interface.");
    print.text("Created By : Ahmad Kagendra ©2025");
    print.text("Github : https://github.com/ahmadkagendra");

    await delay(500)
    print.info("\nHow to use this CLI :");
    print.normal("help      ~> CLI Usage guide.")
    print.normal("menu      ~> Back to CLI main menu.");
    print.normal("sr-check  ~> Open Utilitis Check a Zelio SR by code Spectification. ");
    print.normal("plc-check ~> Open Utilitis Check a Omron PLC by code Spectification.");
    print.normal("exit      ~> Exit the CLI.\n");

}