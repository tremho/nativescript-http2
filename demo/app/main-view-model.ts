import {Observable} from '@nativescript/core'
import {pluginId, Http2} from '@tremho/nativescript-http2'

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
    const http2 = new Http2()
    const session = http2.connect('https://www.google.com')
    const request = session.request({":path:": '/'})
    // request.setEncoding('utf8')
    request.on('response', handleResponse)
    request.on('data', handleData)
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