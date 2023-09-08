const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')


// helper function to create events
const logEvents = async (message, logFileName) => {
    const dateTime = `${format( new Date(), "yyyyMMdd\tHH:mm:ss")}`
    const logItem = `${ dateTime }\t${uuid}\t${message}`

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
    } catch (error) {
        console.log(error)
    }
}

const looger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.header.origin}`, 'reqLog.log')
}

