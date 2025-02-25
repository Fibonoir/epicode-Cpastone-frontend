import { Routes } from '@angular/router';
import { AdminAreaComponent } from './components/pages/admin-area/admin-area.component';
import { LoginComponent } from './components/pages/login/login.component';
import { AuthGuard } from './guards/AuthGuard';
import { CatchAllRoutesComponent } from './components/pages/catch-all-routes/catch-all-routes.component';
import { HomepageComponent } from './components/pages/homepage/homepage.component';
import { InsertionsResolver } from './configs/insertion-resolver';
import { ThemeResolver } from './configs/theme-resolver';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'adminArea',
        component: AdminAreaComponent,
        canActivate: [AuthGuard],
    },
    {
        path: '',
        component: HomepageComponent,
        resolve: {
            insertions: InsertionsResolver,
            theme: ThemeResolver,
        },
    },
    {
        path: '**',
        component: CatchAllRoutesComponent,
    },
];
