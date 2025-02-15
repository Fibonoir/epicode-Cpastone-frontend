import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminAreaComponent } from './components/admin-area/admin-area.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'adminArea',
        component: AdminAreaComponent
    }
];
