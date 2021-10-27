import {Observable} from '@nativescript/core'
import {pluginId, Http2} from '@tremho/nativescript-http2'

import {host} from "./host"

export class PluginTesterModel extends Observable {
  private _message: string = ''

  constructor() {
    super()
  }

  get message(): string {
    return this._message
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value
      this.notifyPropertyChange('message', value)
    }
  }

  onTap() {
    this.message = pluginId()
    this.testPlugin()
  }
  testPlugin() {
    const port = 51610
    console.log('host', host);
    const http2 = new Http2()
    const session = http2.connect('http://'+host+':'+port)
    const request = session.request({":path:": '/test'})
    // request.setEncoding('utf8')
    request.on('response', handleResponse)
    request.on('data', handleData)
    request.on('error', handleError)
  }
}
function handleResponse(headers:string[]) {
  // we can log each response header here
  console.log('Response headers:')
  for (const name in headers) {
    console.log(`${name}: ${headers[name]}`)
  }
}
function handleData(data:any) {
  console.log('data chunk', data)
}
function handleError(error:any) {
  console.error('>>>>>>>>>>>>>>>>>>>>')
  console.log(error)
  console.error('<<<<<<<<<<<<<<<<<<<<<<')
}