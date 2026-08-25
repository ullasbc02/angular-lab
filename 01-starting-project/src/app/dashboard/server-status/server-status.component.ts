import { Component, OnInit } from '@angular/core';
import { DashboardItemComponent } from "../dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [DashboardItemComponent],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css'
})
export class ServerStatusComponent  implements OnInit{
  currentStatus: 'online' | 'offline' | 'unknown' = 'unknown';

  constructor() {
    
  }

  ngOnInit() {
    setInterval(() => {
      const rnd = Math.random();
      if (rnd < 0.5) {
        this.currentStatus = 'online';
      } else if (rnd >= 0.5) {
        this.currentStatus = 'offline';
      }else{
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }
}
