const conf = new (require('conf'))()
const chalk = require('chalk')
const promptly = require('promptly')
const { listAllApiKeyNames, getKeyByName } = require("./listAllApiKeys")

function createEnvironment() {
    const ENV_EXITS = 'ENV_EXITS'
    const INVALID_API_KEY = 'INVALID_API_KEY'
    const timeoutSeconds = 60000
    let envList = conf.get('env-list');
    let name;
    let uid;
    let url;
    let apiKey;

    const nameAnswer = promptly.prompt('Name of environment: ', { timeout: timeoutSeconds });
    nameAnswer.then((newEnvName) => {
        if (envList) {
            let isFoundExistingEnv = envList.some((env) => {
                if (env.name === newEnvName) {
                    //key already exist therefore updating the existing key
                    throw new Error(ENV_EXITS);
                    return true;
                }
            });
            if (!isFoundExistingEnvl) {
                name = newEnvName;
            }

        } else {
            if (newEnvName) {
                name = newEnvName;
                console.log(
                    chalk.yellowBright(`Recieved ${newEnvName} name`)
                )
            } else {
                console.log(
                    chalk.redBright(`something went wrong newEnvName = ${newCollName},  collectionList = ${collectionList}`)
                )
            }
        }
        const uidAnswer = promptly.prompt('UID of environment: ', { timeout: timeoutSeconds });
        return uidAnswer;
    }).then((newEnvUid) => {
        //console.log("New Uid recieved : ", newCollUid)
        uid = newEnvUid;
        listAllApiKeyNames();
        const apiKeyAnswer = promptly.prompt('ApiKey: ', { timeout: timeoutSeconds });
        return apiKeyAnswer;
    }).then((newApiKeyAnswer) => {
        apiKey = newApiKeyAnswer
        // console.log("New apiKeyAnswer recieved", apiKey);
    }).then(() => {

        var key = getKeyByName(apiKey);
        if (key === undefined) throw new Error(INVALID_API_KEY);
        url = `https://api.getpostman.com/environments/${uid}?apikey=${key}`
        // console.log(`url = ${url}`)
    }).then(() => {
        if (!envList) {
            envList = []
        }
        // console.log(name, uid, url, apiKey);
        if (name && uid && url && apiKey) {
            pushNewEnvironment(envList, name, uid, url, apiKey)
            //set collection-list in conf
            conf.set('env-list', envList)
            console.log(
                chalk.green.bold(`Added ${name} to environment list`)
            )
        } else {
            throw new Error('Something went wrong');
        }
    }).catch((exception) => {
        if (exception.message === ENV_EXITS) {
            console.log(
                chalk.bgRedBright(`Environment already exist try again with a different name`)
            )
        } else if (exception.message === INVALID_API_KEY) {
            console.log(
                chalk.bgRedBright(`API key selected does not exist. Please select existing key OR create new apikey before creating environment.`)
            )
        }
        console.log(
            chalk.blueBright(`For more info : newman-manager --help`)
        )
    });
}

function pushNewEnvironment(envList, envName, envUid, envUrl, envApiKey) {
    let newEnvironment = {
        name: envName,
        uid: envUid,
        url: envUrl,
        apiKey: envApiKey
    }
    //push the new key to the keys-list
    envList.push(newEnvironment)
    console.log(
        chalk.green.bold(`Creating new environment`, newEnvironment)
    )
}

module.exports = createEnvironment