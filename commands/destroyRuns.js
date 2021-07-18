const conf = new (require('conf'))()
const chalk = require('chalk')
const promptly = require('promptly')
const { getScheduledRun } = require('./listAllScheduledRuns')

function purgeAllRuns() {
    const runList = conf.get('run-list');

    const answer = promptly.confirm('Are you really sure? ', { timeout: 5000 });
    answer.then((value) => {
        // console.log('Answer:', answer);
        if (value) {
            let runCount = runList.length
            runList.splice(0, runList.length);
            conf.set('run-list', runList)
            console.log(
                chalk.redBright(`purged ${runCount} scheduled run`)
            )
        } else {
            console.log(
                chalk.greenBright(`Purge operation Aborted.`)
            )
        }
    })

}

function disableRun(options) {
    console.log(`uuid = `, options);
    // let runEntry = getScheduledRun(options.Uuid)

    const runList = conf.get('run-list')
    let runEntry = runList.find((run) => {
        return run.uuid === options.Uuid;
    });

    if (runEntry) {
        if (runEntry.isActive === true) {
            runEntry.isActive = false
            conf.set('run-list', runList)
            console.log(
                chalk.greenBright(`Switched run ${runEntry.uuid} inactive.`)
            )
        } else {
            console.log(
                chalk.cyanBright(`run ${runEntry.uuid} is already inactive.`)
            )
        }
    } else {
        console.log(
            chalk.bgRedBright(`No run found for ${options.Uuid}.`)
        )
    }
}

function destroyRun(options) {
    console.log(`uuid = `, options);
    // let runEntry = getScheduledRun(options.Uuid)

    const runList = conf.get('run-list')
    let runEntry = runList.find((run) => {
        return run.uuid === options.Uuid;
    });

    if (runEntry) {
        console.log(`|` + runEntry.runJob + `|`)
        console.log(Object.getOwnPropertyNames(runEntry))
        runEntry.stop()
        runEntry.splice(runEntry.indexOf(JSON.stringify(runEntry)));
        conf.set('run-list', runList)
        console.log(
            chalk.greenBright(`Destroyed run ${runEntry.uuid}.`)
        )
    } else {
        console.log(
            chalk.bgRedBright(`No run found for ${options.Uuid}.`)
        )
    }
}

module.exports = {
    purgeAllRuns: purgeAllRuns,
    disableRun: disableRun,
    destroyRun: destroyRun,
}