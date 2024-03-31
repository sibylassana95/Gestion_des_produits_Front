import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  /* {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW',
    },
  }, */

  {
    title: true,
    name: 'Produits',
  },
  {
    name: 'Produits',
    url: '/produits',
    iconComponent: { name: 'cil-tags' },
  },
  {
    name: 'Ajouter un produit',
    url: '/produits/add',
  },

  {
    title: true,
    name: 'Categorie',
  },
  {
    name: 'Categorie',
    url: '/categories',
    iconComponent: { name: 'cil-tags' },
  },
  {
    name: 'Ajouter un categorie',
    url: '/categories/add',
  },
];
