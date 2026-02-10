import { Component } from '@angular/core';

@Component({
  selector: 'app-trust-signals',
  imports: [],
  templateUrl: './trust-signals.html',
  styleUrl: './trust-signals.scss',
})
export class TrustSignals {
  stats = [
    { value: '500+', label: 'Plantas Catalogadas' },
    { value: '95%', label: 'Precisión IA' },
    { value: '10,000+', label: 'Usuarios' },
    { value: '15', label: 'Comunidades' },
  ];
}
