export default function (rl , print) {
    return function () {
        print.response(`utility on the main menu : `)
        print.normal(`plc-chek ~> Chek Omron PLC spectifications.`)
        print.normal(`sr-chek  ~> Chek Zelio SR spectifications.\n`)
        rl.prompt();
    }
}