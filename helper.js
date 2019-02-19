const moment = require('moment');
const fs = require('fs')
let csv = "node name,host,bulkQueue,searchQueue,refreshQueue\n";

async function csvGeneration(api, config, data) {

    //thread_pool csv generator
    if (api == config.thread_pool_api) {
        Object.keys(data.nodes).forEach(i => {
            const time = moment(data.nodes[i].timestamp).format('h.mm:ss YYYY MMM DD')
            csv += time + "\n" + i + ","
            const nodes = data.nodes[i];
            csv += nodes.host + ","
            const thread_pool = nodes.thread_pool;
            const bulkQueue = thread_pool.bulk.queue;
            const searchQueue = thread_pool.search.queue;
            const refreshQueue = thread_pool.refresh.queue
            csv += bulkQueue + "," + searchQueue + "," + refreshQueue + "\n"
            fs.appendFileSync('stats.csv', csv)
            console.log("append data")
            csv=''
        })
    }

    //fs csv generator
    if (api == config.fs_api) {
        Object.keys(data.nodes).forEach(i => {
            csv += i + ","
            const nodes = data.nodes[i];
            csv += nodes.host + ","
            const thread_pool = nodes.thread_pool;
            const bulkQueue = thread_pool.bulk.queue;
            const searchQueue = thread_pool.search.queue;
            const refreshQueue = thread_pool.refresh.queue
            csv += bulkQueue + "," + searchQueue + "," + refreshQueue + "\n"
            callback(csv)
        })
    }
}
module.exports = { csvGeneration }