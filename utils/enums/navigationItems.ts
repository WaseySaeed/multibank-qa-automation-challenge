export enum NavigationItem {
  EXPLORE = 'Explore',
  FEATURES = 'Features',
  OTC_DESK = 'OTC Desk',
  COMPANY = 'Company',
  SUPPORT = 'Support',
  MBG = '$MBG',
}

export const NavigationItemURLs: Record<NavigationItem, string> = {
  [NavigationItem.EXPLORE]: 'explore',
  [NavigationItem.FEATURES]: 'features',
  [NavigationItem.OTC_DESK]: 'otc-desk',
  [NavigationItem.COMPANY]: 'company',
  [NavigationItem.SUPPORT]: 'support',
  [NavigationItem.MBG]: 'token.multibankgroup.com',
};
