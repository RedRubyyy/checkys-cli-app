//NODE MODULES
import * as readline from 'node:readline/promises';
import process from 'node:process';

//LOG
import info from "./src/info.mjs";
import menu from './src/menu.mjs';
import help from './src/help.mjs';

//UTILITY
import print from './utils/print.mjs';
import checkPlc from './utils/check-plc.mjs';
import checkSr from './utils/check-sr.mjs';
import getData from './utils/getData.mjs';
import delay from './utils/delay.mjs';

const reader = await getData(print);
const data = JSON.parse(reader)["contain"]["data-specifications"];

const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    terminal : true,
    prompt : " <command> ",
    history : [],
    historySize : 3,
    removeHistoryDuplicates : true,
})

const utilityFunction = {
    "help" : help(rl , print),
    "menu" : menu(rl , print),
    "sr-check" : checkSr(rl , print , data),
    "plc-check" : checkPlc(rl , print , data),
    "exit" : async function () {
        print.response("Close CLI...")
        return rl.close()
    }
}

if (!reader) {
    print.error("Get data failled.");
    process.exit();
} else {
    await delay(500)
    await info(print , delay)
    rl.prompt()
}

rl.on('line' , async function (line) {
    const linePurify = line.trim().toLowerCase();

    if (Object.keys(utilityFunction).includes(linePurify)) {
        return await utilityFunction[linePurify]()
    };

    print.error(`invalid command : ${line}`);
    print.normal("help to display a valid commands\n");
    rl.prompt();
})