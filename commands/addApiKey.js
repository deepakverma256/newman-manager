const conf = new (require('conf'))()
const chalk = require('chalk')

function addApiKey(options) {
    let keysList = conf.get('keys-list')
    console.log(name = `${options.name}, value = ${options.key}`);
    if (keysList) {
        let isFoundExistingKey = keysList.some((key) => {
            if (key.name === options.name) {
                //key already exist therefore updating the existing key
                console.log(
                    chalk.magenta.bold(`key ${key.name} already exist therefore updating the existing key`)
                )
                updateKeyValue(keysList, key, options.key);
                return true;
            }
        });
        if (!isFoundExistingKey) {
            pushNewKey(keysList, options.name, options.key);
        }
    } else {
        //default value for keysList
        keysList = []
        pushNewKey(keysList, options.name, options.key)
        //display message to user
        console.log(
            chalk.green.bold(`Adding new key ${options.name}`)
        )
    }

    //set keys-list in conf
    conf.set('keys-list', keysList)
    //display message to user
    console.log(
        chalk.green.bold('Key has been added successfully!')
    )
}

function pushNewKey(keysList, keyName, keyValue) {
    //push the new key to the keys-list
    keysList.push({
        name: keyName,
        value: keyValue
    })
    console.log(
        chalk.green.bold(`Adding new key ${keyName}`)
    )
}

function updateKeyValue(keysList, key, newkeyValue) {
    key.value = newkeyValue;
}

module.exports = addApiKey