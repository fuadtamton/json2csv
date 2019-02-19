const axios = require('axios');
var sleep = require('sleep');
const conf = require('config');

const { csvGeneration } = require('./helper')

let data = '';
config = conf.get('config')

async function csvGenerator(host, port, api) {
    console.log("on getdata")
    let i = 0
    while (i < config.numberOfCount) {
        console.log("init loop")
        await axios.get(`${host}:${port}${api}`)
            .then(res => {
                console.log("on axios")
                data = res.data
                csvGeneration(api, config, data)
            })
            .catch(e => {
                return console.log("ERROR ")
            })
        sleep.sleep(config.intervalInSeconds);
        i++
    }
}

csvGenerator(config.host, config.port, config.thread_pool_api)