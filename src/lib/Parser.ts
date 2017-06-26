import Packet from '../Packet'
import * as Types from '../types'

export function parse (raw: Types.IRawPacket|Buffer|string, packet?: Packet): Packet {
  if (packet && !(packet instanceof Packet)) {
    throw new TypeError('invalid packet')
  } else if (typeof raw !== 'string' && typeof raw !== 'object' && !Buffer.isBuffer(raw)) {
    throw new TypeError('invalid raw')
  }

  if (!packet) packet = Packet.create()

  let _raw: Types.IRawPacket
  if (Buffer.isBuffer(raw)) {
    _raw = JSON.parse(raw.toString())
  } else if (typeof raw === 'string') {
    _raw = JSON.parse(raw)
  } else {
    _raw = raw
  }

  for (let property in _raw) {
    const propType = Types.PropertyString.indexOf(property) as Types.Property
    if (propType === Types.Property.PACKET_TYPE) {
      // Set the packet type
      packet.type = Types.TypeString.indexOf(_raw[property])
    } else if (propType === Types.Property.PACKET_ID) {
      // Set the packet ID
      packet.id = _raw[property]
    } else if (propType === Types.Property.DATA) {
      // Set the packet data
      for (let key in _raw[property]) {
        packet.setData(key, _raw[property][key])
      }
    } else if (propType !== -1) {
      // Set all non-special properties
      packet.setProperty(propType, _raw[property])
    } else {
      throw new Error(`invalid property '${property}'`)
    }
  }

  return packet
}
