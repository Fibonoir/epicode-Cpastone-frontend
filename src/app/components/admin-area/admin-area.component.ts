import { Component } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { DashboardComponent } from "../dashboard/dashboard.component";

@Component({
  selector: 'app-admin-area',
  imports: [SidebarComponent, DashboardComponent],
  templateUrl: './admin-area.component.html',
  styles: ``
})
export class AdminAreaComponent {

}
