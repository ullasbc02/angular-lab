import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {}
