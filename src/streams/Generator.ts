import { Transform, TransformOptions } from 'stream'
import Packet from '../Packet'
import { OutputFormat } from '../lib/Generator'

export { OutputFormat } from '../lib/Generator'

export interface IStreamOptions {
  outputFormat?: OutputFormat
}

const DEFAULT_OPTS: IStreamOptions = {
  outputFormat: OutputFormat.OBJECT
}

export class Generator extends Transform {
  private _opts: IStreamOptions

  public constructor (opts?: IStreamOptions) {
    opts = Object.assign({}, DEFAULT_OPTS, opts)
    const streamOpts: TransformOptions = { writableObjectMode: true }
    if (opts.outputFormat !== OutputFormat.BUFFER) streamOpts.readableObjectMode = true

    super(streamOpts)
    this._opts = opts
  }

  public _transform (chunk: Packet, encoding: string, callback: Function): void {
    if (!(chunk instanceof Packet)) {
      callback(new TypeError('input must be a packet'))
    } else {
      try {
        let generated = chunk.generate({ outputFormat: this._opts.outputFormat })
        callback(null, generated)
      } catch (e) {
        e.message = `generate fail: ${e.message}`
        callback(e)
      }
    }
  }
}
