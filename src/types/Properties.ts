export enum Property {
  // General
  PACKET_TYPE,

  // IDs
  PACKET_ID,
  NETWORK_ID,
  GOVERNOR_ID,

  // Authentication
  AUTH_TYPE,
  AUTH_CREDS,
  AUTH_ERROR,

  // RPC
  RPC_METHOD,
  RPC_ARGS,
  RPC_ERROR,

  // Monitoring
  PEER_UPTIME,
  PEER_CPU,
  PEER_MEM,

  // Events
  EVENT_NAME,
  EVENT_ARGS,

  // Misc
  INFO_MSG,
  DATA
}

export const PropertyString = [
  // General
  't',

  // IDs
  'i',
  'nw',
  'n',

  // Authentication
  'at',
  'ac',
  'ar',

  // RPC
  'rq',
  'ra',
  're',

  // Monitoring
  'pu',
  'pc',
  'pm',

  // Events
  'en',
  'ea',

  // Misc
  'im',
  'd'
]
