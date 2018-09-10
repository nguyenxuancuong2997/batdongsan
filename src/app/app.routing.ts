import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule' },    
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const AppRoutes = RouterModule.forRoot(routes);
