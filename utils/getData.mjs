import * as fs from 'node:fs/promises'

export default async function (print) {

    print.text("Reading data...");

    const option = {encoding : 'utf8'};
    const read = await fs.readFile('./data.json' , option)
        .then(result => {
            print.response("Reading successfully");
            return result
        })
        .catch(error => {
            print.error("Reading vailed");
            return false
        });
    return read;
}
