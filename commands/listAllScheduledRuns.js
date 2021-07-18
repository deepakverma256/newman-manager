const conf = new (require('conf'))()
const chalk = require('chalk')
const Table = require('cli-table')

function listAllScheduledRuns() {
    const runList = conf.get('run-list')

    if (runList) {
        console.log(`runs = ${runList}`)
    }

    console.log(
        chalk.greenBright(`Found ${runList.length} scheduled runs as following:`)
    )

    var table = new Table({
        head: ['UUID', 'Collection', 'Environment', 'Schedule', 'isActive?']
        , colWidths: [40, 25, 15, 20, 10]
    });

    runList.every((run, index) => {
        return table.push([run.uuid, run.collection, run.environment, run.schedule, run.isActive]);
    })

    console.log(
        chalk.yellowBright(table.toString())
    );
}

function isValidRun(uuid) {
    const runList = conf.get('run-list')
    let isValid = runList.some((run) => {
        return run.uuid === uuid;
    });
    return isValid
}

function getScheduledRun(uuid) {
    const runList = conf.get('run-list')
    console.log(uuid);
    let runEntry = runList.find((run) => {
        return run.uuid === uuid;
    });
    return runEntry
}

module.exports = {
    listAllScheduledRuns: listAllScheduledRuns,
    isValidRun: isValidRun,
    getScheduledRun, getScheduledRun,
}