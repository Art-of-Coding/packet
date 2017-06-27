# packet &nbsp;&nbsp; [![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

A small module that provides a `Packet` class and associated machinery. It implements
a JSON-based messaging protocol.

The module is not published on npm yet.

> A protocol specification as well as how to use the module is forthcoming.

## Usage

Using the `Packet` class:

```ts
import Packet from 'packet/Packet'
import * as Types from 'packet/types'

// Create a new RPC request packet
const packet = Packet.create(Types.Type.RPC_REQ)

// Set the RPC method
packet.setProperty(Types.Property.RPC_METHOD, 'get-services')
// Set the RPC arguments
packet.setProperty(Types.Property.RPC_ARGS, [ 'l', 'all' ])

// Generate a packet
const obj = packet.generate()

// Display it
console.log(JSON.stringify(obj))
```

The generated packet will look like this:

```json
{
  "t": "rq",
  "i": "rjkekr-4ed",
  "rq": "get-services",
  "ra": [ "l", "all" ]
}
```

Where `i` is the automatically generated RPC/packet message ID. This message ID
can also be set manually.

## Types

Every packet has a packet type. The type identifies what kind of packet it is.
The complete list can be found in [types/Types.ts](src/types/Types.ts).

| Type     | String | Description             |
|----------|--------|-------------------------|
| INFO     | i      | General info            |
| AUTH_REQ | aq     | Authentication request  |
| AUTH_RES | ar     | Authentication response |
| RPC_REQ  | rq     | RPC request             |
| RPC_RES  | rr     | RPC response            |
| PEER_MON | m      | Monitoring info         |
| EVENT    | e      | Event                   |

## Properties

A packet has at least one property (the type), but usually more.
The complete list can be bound in [types/Properties.ts](src/types/Properties.ts).

| Property    | String | Description                |
|-------------|--------|----------------------------|
| PACKET_TYPE | t      | Packet type                |
| PACKET_ID   | i      | Packet ID (for RPC)        |
| NETWORK_ID  | nw     | Network ID                 |
| GOVERNOR_ID | n      | Governor (instance) ID     |
| AUTH_TYPE   | at     | Authentication type        |
| AUTH_CREDS  | ac     | Authentication credentials |
| AUTH_ERROR  | ar     | Authentication error       |
| RPC_METHOD  | rq     | RPC method                 |
| RPC_ARGS    | ra     | RPC arguments              |
| RPC_ERROR   | re     | RPC error                  |
| PEER_UPTIME | pu     | Peer uptime                |
| PEER_CPU    | pc     | Peer cpu                   |
| PEER_MEM    | pm     | Peer memory                |
| EVENT_NAME  | en     | Event name                 |
| EVENT_ARGS  | ea     | Event arguments            |
| INFO_MSG    | im     | Info message               |
| DATA        | d      | Data                       |

## License

Copyright 2017 [Michiel van der Velde](http://www.michielvdvelde.nl).

This software is licensed under the [MIT License](LICENSE).
