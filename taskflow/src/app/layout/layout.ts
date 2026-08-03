import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss'],
})
export class Layout {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
