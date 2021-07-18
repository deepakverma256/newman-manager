const conf = new (require('conf'))()
const chalk = require('chalk')
const promptly = require('promptly')

function removeAllApiKeys() {
    const keysList = conf.get('keys-list');


    const answer = promptly.confirm('Are you really sure? ', { timeout: 5000 });
    answer.then((value) => {
        // console.log('Answer:', answer);
        if (value) {
            let keyCount = keysList.length
            keysList.splice(0, keysList.length);
            conf.set('keys-list', keysList)
            console.log(
                chalk.redBright(`Deleted ${keyCount} keys`)
            )
        } else {
            console.log(
                chalk.greenBright(`Delete operation Aborted.`)
            )
        }
    })


}
module.exports = removeAllApiKeys