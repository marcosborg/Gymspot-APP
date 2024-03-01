import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'cms/:content_page_id',
    loadComponent: () => import('./pages/cms/cms.page').then( m => m.CmsPage)
  },
];
