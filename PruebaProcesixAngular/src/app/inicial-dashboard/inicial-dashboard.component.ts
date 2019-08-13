import { Component } from '@angular/core';

@Component({
  selector: 'inicial-dashboard',
  templateUrl: './inicial-dashboard.component.html',
  styleUrls: ['./inicial-dashboard.component.css']
})
export class InicialDashboardComponent {
  cards = [
    { title: 'Card 1', cols: 2, rows: 1 },
    { title: 'Card 2', cols: 1, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 2 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];
}
