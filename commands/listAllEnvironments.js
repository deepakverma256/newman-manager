const conf = new (require('conf'))()
const chalk = require('chalk')
const Table = require('cli-table')

function listAllEnvironments() {
    const envList = conf.get('env-list')

    console.log(
        chalk.greenBright(`Found ${envList.length} Environments as following:`)
    )

    var table = new Table({
        head: ['NAME', 'UID', 'URL', 'API KEY']
        , colWidths: [10, 40, 40, 40]
    });

    envList.every((env, index) => {
        return table.push([env.name, env.uid, env.url, env.apiKey]);
    })

    console.log(
        chalk.yellowBright(table.toString())
    );
}

function isValidEnv(name) {
    const envList = conf.get('env-list')
    let isValid = envList.some((env) => {
        return env.name === name;
    });
    return isValid
}

function getEnvironemtByName(name) {
    const envList = conf.get('env-list')
    console.log(name);
    let environment = envList.find((env) => {
        return env.name === name;
    });
    return environment
}

module.exports = {
    listAllEnvironments: listAllEnvironments,
    isValidEnv: isValidEnv,
    getEnvironemtByName: getEnvironemtByName,
}
//module.exports = listAllEnvironments;