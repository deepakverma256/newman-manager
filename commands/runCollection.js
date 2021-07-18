const conf = new (require('conf'))()
const chalk = require('chalk')
const { listAllCollections, getCollectionByName } = require('./listAllCollections')
const { listAllEnvironments, getEnvironemtByName } = require('./listAllEnvironments')
const newman = require('newman');
const path = require('path');

function runCollection(options) {
    let DEFAULT_REPORT_LOCATION = '.'
    console.log(options);
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
        runNewman(collection, environment, reportDir);
    } else {
        console.log(
            chalk.bgRedBright(`Collection does not exist. Please select existing one OR create new collection.`)
        )
    }
}

function runNewman(collection, environment, reportDir) {
    // call newman.run to pass `options` object and wait for callback
    let reportFilePath = generateFileName(collection.name, reportDir)

    newman.run({
        collection: collection.url, // can also provide a URL or path to a local JSON file.
        environment: environment.url,
        reporters: ['cli', 'json', 'html'],
        reporter: {
            html: {
                export: reportFilePath + '.html', // If not specified, the file will be written to `newman/` in the current working directory.
            },
            json: {
                export: reportFilePath + '.json'
            }
        }
    }, function (err) {
        if (err) { throw err; }
        console.log('collection run complete!');
    });
    console.log(reportFilePath)
}

function generateFileName(collName, dir) {
    console.log(dir)
    let date_ob = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    return dir + '/' + collName + '_' + month + date + year + hours + minutes + seconds
}

module.exports = {
    runCollection: runCollection,
    runNewman: runNewman
};