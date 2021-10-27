
import {H2Client} from "./H2Client";

const client = new H2Client()


function wait(time:number) {
    return new Promise(resolve => {
        setTimeout(resolve, time)
    })
}

async function start() {
    console.log('Client starting')
    client.request('/test')
    let alive = true
    while(alive) {
        const code = await client.syncStatus('My Status')
        alive = await client.processDirectives()
    }

    console.log('done')
    client.end()
}


start()