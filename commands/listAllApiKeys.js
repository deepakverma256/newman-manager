const conf = new (require('conf'))()
const chalk = require('chalk')
const Table = require('cli-table')

function listAllApiKeys() {
    const keysList = conf.get('keys-list')

    console.log(
        chalk.greenBright(`Found ${keysList.length} keys as following:`)
    )

    var table = new Table({
        head: ['NAME', 'KEY']
        , colWidths: [20, 40]
    });

    keysList.every((key, index) => {
        return table.push([key.name, key.value]);
    })

    console.log(
        chalk.yellowBright(table.toString())
    );
}

function listAllApiKeyNames() {
    const keysList = conf.get('keys-list')

    console.log(
        chalk.yellowBright(`Please select api keys from following ${keysList.length} keys:`)
    )

    var table = new Table({
        head: ['NAME']
        , colWidths: [20]
    });

    keysList.every((key, index) => {
        return table.push([key.name]);
    })

    console.log(
        chalk.yellowBright(table.toString())
    );
}

function getKeyByName(name) {
    const keysList = conf.get('keys-list')
    let key = keysList.find((key) => {
        if (key.name === name) return key;
    })
    //console.log(name, '---- ', JSON.stringify(key));
    if (key === undefined)
        return key
    else
        return key.value;
}

module.exports = {
    listAllApiKeys: listAllApiKeys,
    listAllApiKeyNames: listAllApiKeyNames,
    getKeyByName: getKeyByName,
}