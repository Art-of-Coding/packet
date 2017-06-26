import * as Types from './types'
import * as Generator from './lib/Generator'
import * as Parser from './lib/Parser'

export default class Packet {

  /**
   * Creates a new Packet of the desired type.
   * @param  {Types.Type} type The packet type
   * @return {Packet}          A new Packet
   */
  static create (type?: Types.Type): Packet {
    return new Packet(type)
  }

  /**
   * Creates a new Packet from a raw input.
   * @param  {Types.IRawPacket|Buffer|string} raw             The raw input
   * @param  {boolean}                        [autoLock=true] Auto-lock the packet
   * @return {Packet}                                         A new Packet
   */
  static from (raw: Types.IRawPacket|Buffer|string, autoLock: boolean = true): Packet {
    const p = Parser.parse(raw)
    return autoLock ? p.lock() : p
  }

  private _id: string
  private _type: Types.Type
  private _properties: Map<Types.Property, any> = new Map()
  private _data: Map<string|number, any> = new Map()
  private _locked: boolean = false

  private constructor (type?: Types.Type) {
    if (type && Types.TypeString[type]) this._type = type
  }

  public get id (): string {
    return this._id
  }

  public set id (id: string) {
    if (this._locked) throw new Error('packet locked')
    this._id = id
  }

  public get type (): Types.Type {
    return this._type
  }

  public set type (type: Types.Type) {
    if (this._locked) throw new Error('packet locked')
    if (!Types.TypeString[type]) throw new Error('invalid type')
    this._type = type
  }

  public get locked () {
    return this._locked
  }

  public get propertyMap (): Map<Types.Property, any> {
    return this._properties
  }

  public get hasData (): boolean {
    return this._data.size > 0
  }

  public get dataMap () {
    return this._data
  }

  public get networkID () {
    return this.getProperty(Types.Property.NETWORK_ID)
  }

  public set networkID (network: string) {
    this.setProperty(Types.Property.NETWORK_ID, network)
  }

  public get governorID () {
    return this.getProperty(Types.Property.GOVERNOR_ID)
  }

  public set governorID (id: string) {
    this.setProperty(Types.Property.GOVERNOR_ID, id)
  }

  public get RPCMethod (): string {
    return this.getProperty(Types.Property.RPC_METHOD)
  }

  public set RPCMethod (method: string) {
    this.setProperty(Types.Property.RPC_METHOD, method)
  }

  public get RPCArguments () {
    return this.getProperty(Types.Property.RPC_ARGS)
  }

  public set RPCArguments (args: any) {
    this.setProperty(Types.Property.RPC_ARGS, args)
  }

  public get RPCError () {
    return this.getProperty(Types.Property.RPC_ERROR)
  }

  public set RPCError (error: any) {
    this.setProperty(Types.Property.RPC_ERROR, error)
  }

  /**
   * Locks the packet so no more write operations can be performed.
   * @return {Packet} The Packet
   */
  public lock (): Packet {
    this._locked = true
    return this
  }

  /**
   * Unlocks the packet so more write operations can be performed.
   * @return {Packet} The Packet
   */
  public unlock (): Packet {
    this._locked = false
    return this
  }

  /**
   * Sets a property on this Packet. If no value is given, the property is removed.
   * @param  {Types.Property} property     The property
   * @param  {any}            [value=null] The property value
   * @return {Packet}                      The Packet
   */
  public setProperty (property: Types.Property, value: any = null): Packet {
    if (this._locked) {
      throw new Error('packet is locked')
    } else if (!Types.PropertyString[property]) {
      throw new Error('invalid property')
    } else if (value === null) {
      this._properties.delete(property)
    } else {
      this._properties.set(property, value)
    }
    return this
  }

  /**
   * Gets a property.
   * @param  {Types.Property} property The property
   * @return {any}                     The Packet
   */
  public getProperty (property: Types.Property): any {
    if (!property || !Types.PropertyString[property]) {
      throw new TypeError('invalid property')
    }
    return this._properties.get(property)
  }

  /**
   * Sets a data key on this Packet. Of no value is given, the key is removed.
   * @param  {string|number} key          The key
   * @param  {any}           [value=null] The value, if any
   * @return {Packet}                     The Packet
   */
  public setData (key: string|number, value: any = null): Packet {
    if (this._locked) {
      throw new Error('packet is locked')
    } else if (value === null) {
      this._data.delete(key)
    } else {
      this._data.set(key, value)
    }
    return this
  }

  /**
   * Generates a raw object from the Packet and optionally converts it into a
   * string or Buffer.
   * @param  {Generator.IGeneratorOptions}    opts Generator options
   * @return {Types.IRawPacket|Buffer|string}      The generated packet
   */
  public generate (opts?: Generator.IGeneratorOptions): Types.IRawPacket|Buffer|string {
    if (!this._type || !Types.TypeString[this._type]) {
      throw new Error('missing packet type')
    }
    return Generator.generate(this, opts)
  }
}
