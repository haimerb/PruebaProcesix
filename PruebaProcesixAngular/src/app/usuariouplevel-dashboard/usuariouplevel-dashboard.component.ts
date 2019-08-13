import { Component } from '@angular/core';

@Component({
  selector: 'usuariouplevel-dashboard',
  templateUrl: './usuariouplevel-dashboard.component.html',
  styleUrls: ['./usuariouplevel-dashboard.component.css']
})
export class UsuariouplevelDashboardComponent {
  cards = [
    //{ title: 'Ponderaciones', cols: 2, rows: 1 },
    { title: 'Establecimientos', cols: 2, rows: 1 },
    { title: 'Card 3', cols: 1, rows: 1 },
    { title: 'Card 4', cols: 1, rows: 2 },
    { title: 'Card 5', cols: 1, rows: 1 }
  ];
}
