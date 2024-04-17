import { IconType } from 'react-icons'
import { FaChrome, FaSalesforce, FaShopify, FaWordpress } from 'react-icons/fa6'
import { SiQuickbooks } from 'react-icons/si'

export const platformIcons: Record<string, IconType> = {
  chrome: FaChrome,
  quickbooks: SiQuickbooks,
  salesforce: FaSalesforce,
  shopify: FaShopify,
  wordpress: FaWordpress,
}
