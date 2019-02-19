
const axios = require('axios')

let csv = '';
let i = 1



while (i < 4) {
    console.log("into loop")
    co()
    i++
}
async function co() {
    await axios.get('http://localhost:9200/_nodes/stats/thread_pool')
        .then(res => {
            data = res.data
            Object.keys(data.nodes).forEach(i => {
                csv += i + ","
                const nodes = data.nodes[i];
                csv += nodes.host + ","
                const thread_pool = nodes.thread_pool;
                const bulkQueue = thread_pool.bulk.queue;
                const searchQueue = thread_pool.search.queue;
                const refreshQueue = thread_pool.refresh.queue
                csv += bulkQueue + "," + searchQueue + "," + refreshQueue + "\n"
            })
            console.log(csv)
            csv = ''
        }).catch(e => {
            console.log(e)
        })
}