export const BASE_PATH = '/en-AE';

export const routes = {
  home: `${BASE_PATH}`,
  explore: `${BASE_PATH}/explore`,
  features: `${BASE_PATH}/features`,
  company: `${BASE_PATH}/company`,
  otcDesk: `${BASE_PATH}/features/otc-desk`,
  support: `${BASE_PATH}/support`,
  invalid: `${BASE_PATH}/Wasey/RouteNotFound`,
} as const;

export type RouteKey = keyof typeof routes;
