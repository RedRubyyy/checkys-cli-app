let fristInfo = true

export default function (rl , print , data) {
    return async function recursiveFlow () {
        if (fristInfo) {
            print.response("open omron plc checking utility.")
            print.normal("ex : CP1L-Z10UCT-D.\n")
            print.info("type menu for back to main menu.\n")
            fristInfo = false
        }
        const specification = await rl.question("enter your omron plc code specifications : ");

        //Checking object for message print if error code
        const checking = {
            //Include SR in frist character
            bassicCheck : {
                status : specification.split('-').length == 3,
                message : "please input like a example code"
            },
            //Data length validation
            lengthCheck : {
                status : specification.split('-')[0].length == 4 && specification.split('-')[2]?.length == 1,
                message : "invalid format specification code."
            },
        }

        //Contains an error message
        let failledMessage = ''
        //Validation data checking
        const checkingResult = Object.keys(checking).every(key => {
            //When return once the false , it is returned false
            if (checking[key].status != true && !failledMessage) {
                failledMessage = checking[key].message;
            }
            //If every key is true, return true
            return checking[key].status == true
        });

        if (specification == 'menu') {
            print.response("exit plc checking utility.\n");
            fristInfo = true
            return rl.prompt();
        //If validation check is false
        } else if (!checkingResult) {
            print.error(`invalid : ${failledMessage}.\n`);
        //Enter the checking specification
        } else {
            await checkingSpecification(specification , print , data)
        }
        //Recursive flow
        await recursiveFlow()
    }
}

async function checkingSpecification (specification , print , data) {
    const dataPLC = data["omron-plc"];
    const dataKeys = Object.keys(dataPLC);
    const arrayOfCodes = specification.split("-");
    const resultObject = {}

    let indexKeySpecification = 0
    
    print.normal("checking in progress...\n")


    arrayOfCodes.forEach((codes , index)=> {
        if (index == 1) {
        let escapeCode = ''        
            codes.split('').forEach((code , index) => {
                let key = dataKeys[indexKeySpecification]

                if (escapeCode != '') {
                    escapeCode += code
                    resultObject[key] = dataPLC[key][escapeCode];
                    escapeCode = ''
                    indexKeySpecification++
                }
                else if ( dataPLC[key][`${code}${codes[index+1]}`] == undefined && dataPLC[key][code] != undefined) {
                    resultObject[key] = dataPLC[key][code]
                    indexKeySpecification++
                } else {
                    escapeCode += code
                }
            })
        } else {
            let key = dataKeys[indexKeySpecification]
            resultObject[key] = dataPLC[key][codes];
            indexKeySpecification++
        }
    });

    const validation = Object.keys(resultObject).every(key => {
        return resultObject[key] != undefined
    });
    if (!validation) {
        print.error("data cannot be checked.\n")
    }else {
        print.response("these are the omron plc specifications : ")
        console.table(resultObject)
    }
}