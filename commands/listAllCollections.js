const conf = new (require('conf'))()
const chalk = require('chalk')
const Table = require('cli-table');

function listAllCollections() {
    const collectionList = conf.get('collection-list')

    console.log(
        chalk.greenBright(`Found ${collectionList.length} keys as following:`)
    )

    var table = new Table({
        head: ['NAME', 'UID', 'URL', 'API KEY', 'DEFAULT ENV']
        , colWidths: [15, 40, 30, 30, 15]
    });

    collectionList.every((coll, index) => {
        if (!coll.defaultEnv) {
            coll.defaultEnv = ""
        }
        return table.push([coll.name, coll.uid, coll.url, coll.apiKey, coll.defaultEnv]);
    })

    console.log(
        chalk.yellowBright(table.toString())
    );
}

function getCollectionByName(name) {
    const collectionList = conf.get('collection-list')
    console.log(name);
    let collection = collectionList.find((coll) => {
        return coll.name === name;
    });
    return collection
}

module.exports = {
    listAllCollections: listAllCollections,
    getCollectionByName: getCollectionByName,
}