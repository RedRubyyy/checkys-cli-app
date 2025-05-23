let fristInfo = true

export default  function (rl , print ,data) {
    return async function recursiveFlow () {
        //Frist info utility for frist access
        if (fristInfo) {
            print.response("open zelio sr checking utility.")
            print.normal("ex : SR2XT26BD.\n")
            print.info("type menu for back to main menu.\n")
            fristInfo = false
        }
        //Question for take data code specification
        const specification = await rl.question("enter your zelio sr code specifications : ");
        //Checking object for message print if error code
        const checking = {
            //Include SR in frist character
            bassicCheck : {
                status : specification.slice(0 , 2) == "SR",
                message : "incomplete specifications"
            },
            //Data length validation
            lengthCheck : {
                status : specification.length < 11 && specification.length > 7,
                message : "specification have mush max 11 char and greater than 7"
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

        //Back to menu
        if (specification == 'menu') {
            print.response("exit sr checking utility.\n");
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
    const dataSR = data["zelio-sr"];
    const dataKeys = Object.keys(dataSR);
    const arrayOfCode = specification.slice(2 , specification.length).split("");
    const resultObject = {}

    let indexKeySpecification = 0
    let escapeCode = ''
    print.normal("checking in progress...\n")
    arrayOfCode.forEach((code , index)=> {
        
        let key = dataKeys[indexKeySpecification]

        if (indexKeySpecification == 5) return
        
        if ( !dataSR[key][code] && !escapeCode) {
            escapeCode += code
        
        } else if (escapeCode.length == 1) {
            escapeCode += code;
            resultObject[key] = dataSR[key][escapeCode]
            escapeCode = ""
            indexKeySpecification++

        } else {
            resultObject[key] = indexKeySpecification == 4 && index != arrayOfCode.length-1 ? 
                dataSR[key][`${code}${arrayOfCode[index + 1]}`] : dataSR[key][code]

            escapeCode = ''
            indexKeySpecification++
            
        }
    });
    const validation = Object.keys(resultObject).every(key => {
        return resultObject[key] != undefined

    });
    if (!validation) {
        print.error("data cannot be checked.\n")
    }else {
        print.response("these are the zelio sr specifications : ")
        console.table(resultObject)
    }
    
}