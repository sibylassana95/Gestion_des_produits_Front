import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    title: true,
    name: 'Produits',
  },
  {
    name: 'Produits',
    url: '/produits',
    linkProps: { fragment: 'someAnchor' },
    iconComponent: { name: 'cil-pencil' },
  },
];
