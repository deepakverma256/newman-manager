const conf = new (require('conf'))()
const chalk = require('chalk')
const { listAllCollections, getCollectionByName } = require('./listAllCollections')
const { listAllEnvironments, getEnvironemtByName } = require('./listAllEnvironments')
const { listAllScheduledRuns, getScheduledRun } = require('./listAllScheduledRuns')
const { runNewman } = require('./runCollection')
const newman = require('newman');

function scheduleRun(options) {
    let DEFAULT_REPORT_LOCATION = '.'
    console.log(options);
    var cron = require('node-cron');
    let collection = getCollectionByName(options.collectionName);
    if (collection !== undefined) {
        let environment;
        if (options.environmentName) {
            environment = getEnvironemtByName(options.environmentName);
        } else {
            environment = getEnvironemtByName(collection.defaultEnv);
        }

        let reportDir;
        if (options.reportDir) {
            reportDir = options.reportDir
        } else {
            reportDir = DEFAULT_REPORT_LOCATION
        }

        if (options.schedule && cron.validate(options.schedule)) {
            let runEntry = persistRun(collection, environment, reportDir, options.schedule, true)
            let run = cron.schedule(options.schedule, () => {
                if (runEntry && runEntry.isActive)
                    runNewman(collection, environment, reportDir);
            });
            //console.log(Object.getOwnPropertyNames(run))

            persistJobObject(runEntry.uuid, run)

        }

    } else {
        console.log(
            chalk.bgRedBright(`Collection does not exist. Please select existing one OR create new collection.`)
        )
    }
}


function persistRun(collection, environment, reportDir, schedule, isActive, runJob) {
    let runList = conf.get('run-list')
    if (!runList) {
        runList = []
    }

    const { v4: uuidv4 } = require('uuid')
    const newId = uuidv4()

    let runEntry = {
        uuid: newId,
        collection: collection.name,
        environment: environment.name,
        reportDir: reportDir,
        schedule: schedule,
        isActive: isActive
    }

    runList.push(runEntry)

    //set run-list in conf
    conf.set('run-list', runList)
    return runEntry
}

function persistJobObject(uuid, runJob) {
    const runList = conf.get('run-list')
    let runEntry = runList.find((run) => {
        return run.uuid === uuid;
    });

    runEntry.runJob = runJob
    console.log(Object.getOwnPropertyNames(runEntry))
    conf.set('run-list', runList)
}

module.exports = scheduleRun;