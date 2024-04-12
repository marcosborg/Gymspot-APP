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
  {
    path: 'steps',
    loadComponent: () => import('./pages/steps/steps.page').then( m => m.StepsPage)
  },
  {
    path: 'faqs/:content_page_id',
    loadComponent: () => import('./pages/faqs/faqs.page').then( m => m.FaqsPage)
  },
  {
    path: 'location/:location_id',
    loadComponent: () => import('./pages/location/location.page').then( m => m.LocationPage)
  },
  {
    path: 'spot/:spot_id',
    loadComponent: () => import('./pages/spot/spot.page').then( m => m.SpotPage)
  },
  {
    path: 'day/:spot_id/:year/:currentMonth/:dayNumber',
    loadComponent: () => import('./pages/day/day.page').then( m => m.DayPage)
  },
];
