
import {H2Server, setActionCallback, waitToConnect} from "./H2Server";

const stream = new H2Server()



async function puppetTest(action:string):Promise<string> {
    return new Promise(resolve => {
        setActionCallback(action, (res:string) => {
            let n = res.indexOf(':')
            let rcount = Number(res.substring(0, n))
            res = res.substring(n+1)
            const parts = res.split('=')
            const ract = (parts[0] || '').trim()
            const ans = (parts[1] || '').trim()

            if(ract === action.trim()) {
                resolve(ans)
            }
        })
    })
}

let desc, r, x;
let tcount = 0
let pcount = 0
const t = {
    ok : (assert:boolean, message:string) => {
        console.log((assert ? '√':'x')+ ' '+message)

        tcount++
        if(assert) pcount++
    }
}

async function conductTest(t:any) {
    console.log('Waiting for client to connect')
    await waitToConnect()

    desc = 'first connect'
    r = await puppetTest('start')
    x = ''
    t.ok(r === x, desc )

    desc = 'add'
    r = await puppetTest('add 2 3')
    x = '5'
    t.ok(r === x, desc + ` expected ${x}, got ${r}`)

    desc = 'subtract'
    r = await puppetTest('subtract 102 60')
    x = '42'
    t.ok(r === x, desc + ` expected ${x}, got ${r}`)

    desc = 'multiply'
    r = await puppetTest('multiply 7 6')
    x = '42'
    t.ok(r === x, desc + ` expected ${x}, got ${r}`)

    desc = 'divide'
    r = await puppetTest('divide 714 17')
    x = '42'
    t.ok(r === x, desc + ` expected ${x}, got ${r}`)

    desc = 'greet me'
    r = await puppetTest('greet Steve')
    x = 'hello, Steve'
    t.ok(r === x, desc + ` expected ${x}, got ${r}`)

    puppetTest('end')
}

async function start() {
    console.log('Starting test server')
    stream.listen()
    await conductTest(t)
    console.log(`${pcount} of ${tcount} operations performed correctly`)
    const code = pcount === tcount ? 0 : 1
    process.exit(code)

}
start()
