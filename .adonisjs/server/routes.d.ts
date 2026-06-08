import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'presentations.store': { paramsTuple?: []; params?: {} }
    'presentations.show': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'presentations.stream': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'participants.store': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'presentations.show': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'presentations.stream': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'presentations.show': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'presentations.stream': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'presentations.store': { paramsTuple?: []; params?: {} }
    'participants.store': { paramsTuple: [ParamValue]; params: {'code': ParamValue} }
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}