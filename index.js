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
const runCollection = require('./commands/runCollection')

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
    .action(runCollection)


program.addHelpText('after', `Author : Deepak Verma(dverma-ext@beachbody.com)`);

program.parse()