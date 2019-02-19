const axios = require('axios');
const conf = require('config');
const { csvGeneration } = require('./helper')
let data = '';
var sleep = require('sleep');
let csv = "node name,host,bulkQueue,searchQueue,refreshQueue\n";

config = conf.get('config')
function initiator(config) {
    let i = 0
    while (i < config.numberOfCount) {
        console.log("init loop")
        getData(config.host, config.port, config.thread_pool_api)
        // getData(config.host, config.port, config.fs)
        i++
    }
}
initiator(config)

async function getData(host, port, api) {
    console.log("on getdata")
   await axios.get(`${host}:${port}${api}`)
        .then(res => {
            console.log("on axios")
            sleep.sleep(config.intervalInSeconds);
            data = res.data
           csvGeneration(api, config, data)
        })
        .catch(e => {
            return console.log("ERROR ")
        })
}
