import {Observable} from '@nativescript/core'
import {pluginId} from '@tremho/nativescript-http2'

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
  }

}