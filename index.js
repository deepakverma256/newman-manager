#! /usr/bin/env node
const { program } = require('commander')
const addApiKey = require('./commands/addApiKey')
const { listAllApiKeys } = require('./commands/listAllApiKeys')
const removeAllApiKeys = require('./commands/removeAllApiKeys')
const createCollection = require('./commands/createCollection')
const { listAllCollections } = require('./commands/listAllCollections')
const removeAllCollections = require('./commands/removeAllCollections')
const createEnvironment = require('./commands/createEnvironment')
const { listAllEnvironments } = require('./commands/listAllEnvironments')
const { runCollection } = require('./commands/runCollection')
const scheduleRun = require('./commands/scheduler')
const { listAllScheduledRuns } = require('./commands/listAllScheduledRuns')
const { purgeAllRuns, disableRun, destroyRun } = require('./commands/destroyRuns')

program
    .command('listAllApiKeys')
    .description('List all the api keys.')
    .action(listAllApiKeys)

program
    .command('addApiKey')
    .description('Adds new apiKey')
    .requiredOption('-n, --name <name>', 'The name of the api key.')
    .requiredOption('-k, --key <key>', 'The key value of the api key.')
    .action(addApiKey)

program
    .command('removeAllApiKeys')
    .description('Remove all the api keys.')
    .action(removeAllApiKeys)

program
    .command('createCollection')
    .description('Creates a new collection')
    .action(createCollection)

program
    .command('listAllCollections')
    .description('List all the collection.')
    .action(listAllCollections)

program
    .command('removeAllCollections')
    .description('Remove all the collections.')
    .action(removeAllCollections)

program
    .command('createEnvironment')
    .description('Creates a new environment.')
    .action(createEnvironment)

program
    .command('listAllEnvironments')
    .description('List all the collection.')
    .action(listAllEnvironments)

program
    .command('run')
    .description('run a collection.')
    .requiredOption('-c, --collection-name <cname>', 'The name of the collection to run.')
    .option('-e, --environment-name <ename>', 'The name of the environment.')
    .option('-r, --report-dir <rdir>', 'The directory to which reports should be exported.')
    .action(runCollection)

program
    .command('scheduleRun')
    .description('Schedule a cronjob for newman run.')
    .requiredOption('-c, --collection-name <cname>', 'The name of the collection to run.')
    .option('-e, --environment-name <ename>', 'The name of the environment.')
    .requiredOption('-r, --report-dir <rdir>', 'The directory to which reports should be exported.')
    .requiredOption('-s, --schedule <schedule>', 'cronjob scedule (e.g., 0 1 * * *)')
    .action(scheduleRun)

program
    .command('listAllScheduledRuns')
    .description('List all the Scheduled Runs.')
    .action(listAllScheduledRuns)

program
    .command('purgeAllRuns')
    .description('Destroy all scheduled runs.')
    .action(purgeAllRuns)

program
    .command('disableRun')
    .description('Disable a scheduled run.')
    .requiredOption('-u, ---uuid <uuid>', 'The uuid of run job to disable.')
    .action(disableRun)

program
    .command('destroyRun')
    .description('Destroy a scheduled run.')
    .requiredOption('-u, ---uuid <uuid>', 'The uuid of run job to disable.')
    .action(destroyRun)

program.addHelpText('after', `Author : Deepak Verma(dverma-ext@beachbody.com)`);

program.parse()