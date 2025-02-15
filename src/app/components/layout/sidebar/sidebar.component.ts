import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar/avatar.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sidebar',
    imports: [AvatarComponent, CommonModule],
    templateUrl: './sidebar.component.html',
    styles: ``,
})
export class SidebarComponent {
    selectedPage: string = 'dashboard';
    menuOpen: boolean = false;

    pages = [
        { key: 'dashboard', label: 'Dashboard', icon: 'fa-briefcase' },
        { key: 'properties', label: 'Properties', icon: 'fa-building' },
        { key: 'clients', label: 'Clients', icon: 'fa-users' },
        { key: 'reports', label: 'Reports', icon: 'fa-chart-line' },
    ];

    selectPage(pageKey: string) {
        this.selectedPage = pageKey;
        this.menuOpen = false
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
