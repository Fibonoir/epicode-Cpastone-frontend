import { Routes } from '@angular/router';
import { AdminAreaComponent } from './components/pages/admin-area/admin-area.component';
import { LoginComponent } from './components/pages/login/login.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'adminArea',
        component: AdminAreaComponent,
    },
];
