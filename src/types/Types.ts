export enum Type {
  // General
  INFO,

  // Authentication
  AUTH_REQ,
  AUTH_RES,

  // RPC
  RPC_REQ,
  RPC_RES,

  // Monitoring
  PEER_MON,

  // Events
  EVENT
}

export const TypeString = [
  // General
  'i',

  // Authentication
  'aq',
  'ar',

  // RPC
  'rq',
  'rr',

  // Monitoring
  'e',

  // Events
  'm'
]
