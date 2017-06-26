import Packet from '../Packet'
import * as Types from '../types'

import { generate as generatePacketID } from 'shortid'

export interface IGeneratorOptions {
  outputFormat?: OutputFormat
}

export enum OutputFormat {
  OBJECT,
  STRING,
  BUFFER
}

const DEFAULT_OPTS = {
  outputFormat: OutputFormat.OBJECT
}

export function generate (packet: Packet, opts?: IGeneratorOptions): Types.IRawPacket|Buffer|string {
  opts = Object.assign({}, DEFAULT_OPTS, opts || {})
  if (!(packet instanceof Packet)) {
    throw new TypeError('invalid packet')
  } else if (!Types.TypeString[packet.type]) {
    throw new TypeError('missing packet type')
  }

  // Packet ID generation
  if (packet.type === Types.Type.RPC_REQ && !packet.id) {
    if (packet.locked) throw new Error('unable to set packet id: packet locked')
    packet.id = generatePacketID()
  } else if (packet.type === Types.Type.RPC_RES && !packet.id) {
    throw new Error('missing packet id')
  }

  // Create a raw packet object
  const raw: Types.IRawPacket = {}

  // Set packet type
  raw[Types.PropertyString[Types.Property.PACKET_TYPE]] = Types.TypeString[packet.type]

  // Set packet ID if necessary
  if (packet.id) raw[Types.PropertyString[Types.Property.PACKET_ID]] = packet.id

  // Add all stored properties
  for(let [ property, value ] of packet.propertyMap) {
    const propertyStr = Types.PropertyString[property]
    if (propertyStr) {
      raw[propertyStr] = value
    }
  }

  // Add the data payload
  if (packet.hasData) {
    raw[Types.PropertyString[Types.Property.DATA]] = {}
    for (let [ key, value ] of packet.dataMap) {
      raw[Types.PropertyString[Types.Property.DATA]][key] = value
    }
  }

  // Output the result in the desired type
  if (opts.outputFormat === OutputFormat.OBJECT) {
    return raw
  } else {
    const rawStr = JSON.stringify(raw)
    if (opts.outputFormat === OutputFormat.STRING) {
      return rawStr
    } else if (opts.outputFormat === OutputFormat.BUFFER) {
      return Buffer.from(rawStr)
    }
  }
}
