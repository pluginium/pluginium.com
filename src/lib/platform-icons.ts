import { IconType } from 'react-icons'
import {
  FaAtlassian,
  FaChrome,
  FaFigma,
  FaHubspot,
  FaSalesforce,
  FaShopify,
  FaSlack,
  FaWordpress,
} from 'react-icons/fa6'
import { SiAdobe, SiNotion, SiQuickbooks } from 'react-icons/si'

export const platformIcons: Record<string, IconType> = {
  adobe: SiAdobe,
  atlassian: FaAtlassian,
  chrome: FaChrome,
  figma: FaFigma,
  hubspot: FaHubspot,
  notion: SiNotion,
  quickbooks: SiQuickbooks,
  salesforce: FaSalesforce,
  shopify: FaShopify,
  slack: FaSlack,
  wordpress: FaWordpress,
}
