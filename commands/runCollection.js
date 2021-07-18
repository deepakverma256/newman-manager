const conf = new (require('conf'))()
const chalk = require('chalk')
const { listAllCollections, getCollectionByName } = require('./listAllCollections')
const { listAllEnvironments, getEnvironemtByName } = require('./listAllEnvironments')
const newman = require('newman');
const { exec } = require("child_process");

function runCollection(options) {
    console.log(options.collectionName);
    let collection = getCollectionByName(options.collectionName);
    if (collection !== undefined) {
        if (options.environmentName) {
            let environment = getEnvironemtByName(options.environmentName);
            runNewman(collection.url, environment.url);
        } else {
            let environment = getEnvironemtByName(collection.defaultEnv);
            runNewman(collection.url, environment.url);
        }
    } else {
        console.log(
            chalk.bgRedBright(`Collection does not exist. Please select existing one OR create new collection.`)
        )
    }
}

function runNewman(collectionUrl, environmentUrl) {
    // call newman.run to pass `options` object and wait for callback

    newman.run({
        collection: collectionUrl, // can also provide a URL or path to a local JSON file.
        environment: environmentUrl,
        reporters: ['cli', 'json', 'html', 'allure'],
        reporter: {
            html: {
                export: '../reports/htmlResults3.html', // If not specified, the file will be written to `newman/` in the current working directory.
            },
            allure: {
                export: '.../reports/allure'
            },
            json: {
                export: '../reports/json/jsonResult3.json'
            }
        }
    }, function (err) {
        if (err) { throw err; }
        console.log('collection run complete!');
    });
}
module.exports = runCollection;