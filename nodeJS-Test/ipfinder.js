const { networkInterfaces } = require('os');
const fs = require('fs');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}
const en0 = results['en0'][0]
console.log(en0)
const hostFile = process.argv[2]
if(hostFile) {
  hostjs = `export const host="${en0}"\n`
  fs.writeFileSync(hostFile, hostjs)
}