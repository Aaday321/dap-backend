/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'presentations.store': {
    methods: ["POST"],
    pattern: '/api/v1/presentations',
    tokens: [{"old":"/api/v1/presentations","type":0,"val":"api","end":""},{"old":"/api/v1/presentations","type":0,"val":"v1","end":""},{"old":"/api/v1/presentations","type":0,"val":"presentations","end":""}],
    types: placeholder as Registry['presentations.store']['types'],
  },
  'presentations.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/presentations/:code',
    tokens: [{"old":"/api/v1/presentations/:code","type":0,"val":"api","end":""},{"old":"/api/v1/presentations/:code","type":0,"val":"v1","end":""},{"old":"/api/v1/presentations/:code","type":0,"val":"presentations","end":""},{"old":"/api/v1/presentations/:code","type":1,"val":"code","end":""}],
    types: placeholder as Registry['presentations.show']['types'],
  },
  'presentations.stream': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/presentations/:code/stream',
    tokens: [{"old":"/api/v1/presentations/:code/stream","type":0,"val":"api","end":""},{"old":"/api/v1/presentations/:code/stream","type":0,"val":"v1","end":""},{"old":"/api/v1/presentations/:code/stream","type":0,"val":"presentations","end":""},{"old":"/api/v1/presentations/:code/stream","type":1,"val":"code","end":""},{"old":"/api/v1/presentations/:code/stream","type":0,"val":"stream","end":""}],
    types: placeholder as Registry['presentations.stream']['types'],
  },
  'participants.store': {
    methods: ["POST"],
    pattern: '/api/v1/presentations/:code/join',
    tokens: [{"old":"/api/v1/presentations/:code/join","type":0,"val":"api","end":""},{"old":"/api/v1/presentations/:code/join","type":0,"val":"v1","end":""},{"old":"/api/v1/presentations/:code/join","type":0,"val":"presentations","end":""},{"old":"/api/v1/presentations/:code/join","type":1,"val":"code","end":""},{"old":"/api/v1/presentations/:code/join","type":0,"val":"join","end":""}],
    types: placeholder as Registry['participants.store']['types'],
  },
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
