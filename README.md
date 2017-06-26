# packet &nbsp;&nbsp; [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A small module that provides a `Packet` class and associated machinery. It implements
a JSON-based messaging protcol.

The module is not published on npm yet.

> A protocol specification as well as how to use the module is forthcoming.

## Usage

Using the `Packet` class:

```ts
import Packet from 'packet/Packet'
import * as Types from 'packet/types'

const packet = Packet.create(Types.Type.RPC_REQ)

packet.setProperty(Types.Property.RPC_METHOD, 'get-services')
packet.setProperty(Types.Property.RPC_ARGS, [ 'l', 'all' ])

const obj = packet.generate()

console.log(JSON.stringify(obj))
```

## License

Copyright 2017 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](LICENSE).
