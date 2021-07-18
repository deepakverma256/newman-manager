const conf = new (require('conf'))()
const chalk = require('chalk')
const promptly = require('promptly')

function removeAllCollections() {
    const collectionList = conf.get('collection-list');


    const answer = promptly.confirm('Are you really sure? ', { timeout: 5000 });
    answer.then((value) => {
        // console.log('Answer:', answer);
        if (value) {
            let collectionCount = collectionList.length
            collectionList.splice(0, collectionList.length);
            conf.set('collection-list', collectionList)
            console.log(
                chalk.redBright(`Deleted ${collectionCount} keys`)
            )
        } else {
            console.log(
                chalk.greenBright(`Delete operation Aborted.`)
            )
        }
    })


}
module.exports = removeAllCollections