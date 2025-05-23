import chalk from "chalk";

const print = {
    info : function (contain) {
        console.log(chalk.cyan.bold(contain));
    },
    error : function (contain) {
        console.log(chalk.red.bold(contain));
    },
    text : function (contain) {
        console.log(chalk.bold(contain))
    },
    response : function (contain) {
        console.log(chalk.green.bold(contain))
    },
    normal : function (contain) {
        console.log(contain)
    }
}

export default print 
