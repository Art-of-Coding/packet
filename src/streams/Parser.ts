import { Transform, TransformOptions } from 'stream'
import Packet from '../Packet'
import * as Types from '../types'

import { parse } from '../lib/Parser'

export class Parser extends Transform {
  private _autoLock: boolean

  constructor (autoLock: boolean = true) {
    super ({ objectMode: true })
    this._autoLock = autoLock
  }

  _transform (chunk: Types.IRawPacket|Buffer|string, encoding: string, callback: Function): void {
    try {
      const p = parse(chunk)
      if (this._autoLock) p.lock()
      callback(null, p)
    } catch (e) {
      e.message = `parse fail: ${e.message}`
      callback(e)
    }
  }
}
