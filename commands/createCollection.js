const conf = new (require('conf'))()
const chalk = require('chalk')
const promptly = require('promptly')
const { listAllApiKeyNames, getKeyByName } = require("./listAllApiKeys")
const { listAllEnvironments, isValidEnv } = require("./listAllEnvironments")

function createCollection() {
    const COLLECTION_EXITS = 'COLLECTION_EXITS'
    const INVALID_API_KEY = 'INVALID_API_KEY'
    const INVALID_ENV_KEY = 'INVALID_ENV_KEY'
    const timeoutSeconds = 60000
    let collectionList = conf.get('collection-list');
    let name;
    let uid;
    let url;
    let apiKey;
    let defaultEnv;

    const nameAnswer = promptly.prompt('Name of collection: ', { timeout: timeoutSeconds });
    nameAnswer.then((newCollName) => {
        if (collectionList) {
            let isFoundExistingColl = collectionList.some((coll) => {
                if (coll.name === newCollName) {
                    //key already exist therefore updating the existing key
                    throw new Error(COLLECTION_EXITS);
                    return true;
                }
            });
            if (!isFoundExistingColl) {
                name = newCollName;
            }

        } else {
            if (newCollName) {
                name = newCollName;
                console.log(
                    chalk.yellowBright(`Recieved ${newCollName} name`)
                )
            } else {
                console.log(
                    chalk.redBright(`something went wrong newCollName = ${newCollName},  collectionList = ${collectionList}`)
                )
            }
        }
        const uidAnswer = promptly.prompt('UID of collection: ', { timeout: timeoutSeconds });
        return uidAnswer;
    }).then((newCollUid) => {
        //console.log("New Uid recieved : ", newCollUid)
        uid = newCollUid;
        listAllApiKeyNames();
        const apiKeyAnswer = promptly.prompt('ApiKey: ', { timeout: timeoutSeconds });
        return apiKeyAnswer;
    }).then((newApiKeyAnswer) => {
        apiKey = newApiKeyAnswer
        // console.log("New apiKeyAnswer recieved", apiKey);
    }).then(() => {

        var key = getKeyByName(apiKey);
        if (key === undefined) throw new Error(INVALID_API_KEY);
        url = `https://api.getpostman.com/collections/${uid}?apikey=${key}`
        // console.log(`url = ${url}`)
        listAllEnvironments();
        const envAnswer = promptly.prompt('Select environment name from above list: ', { timeout: timeoutSeconds });
        return envAnswer;
    }).then((envAnswer) => {
        let isEnvValid = isValidEnv(envAnswer)
        if (!isEnvValid) throw new Error(INVALID_ENV_KEY);
        defaultEnv = envAnswer
    }).then(() => {
        if (!collectionList) {
            collectionList = []
        }
        // console.log(name, uid, url, apiKey);
        if (name && uid && url && apiKey) {
            pushNewCollection(collectionList, name, uid, url, apiKey, defaultEnv)
            //set collection-list in conf
            conf.set('collection-list', collectionList)
            console.log(
                chalk.green.bold(`Added ${name} to collection list`)
            )
        } else {
            throw new Error('Something went wrong');
        }
    }).catch((exception) => {
        if (exception.message === COLLECTION_EXITS) {
            console.log(
                chalk.bgRedBright(`Collection already exist try again with a different name`)
            )
        } else if (exception.message === INVALID_API_KEY) {
            console.log(
                chalk.bgRedBright(`API key selected does not exist. Please select existing key OR create new apikey before creating collection.`)
            )
        } else if (exception.message === INVALID_ENV_KEY) {
            console.log(
                chalk.bgRedBright(`Environment selected does not exist. Please select existing key OR create new environment before creating collection.`)
            )
        }
        console.log(
            chalk.blueBright(`For more info : newman-manager --help`)
        )
    });
}

function pushNewCollection(collList, collName, collUid, collUrl, collApiKey, defaultEnv) {
    let newCollection = {
        name: collName,
        uid: collUid,
        url: collUrl,
        apiKey: collApiKey,
        defaultEnv: defaultEnv
    }
    //push the new key to the keys-list
    collList.push(newCollection)
    console.log(
        chalk.green.bold(`Creating new collection`, newCollection)
    )
}

module.exports = createCollection