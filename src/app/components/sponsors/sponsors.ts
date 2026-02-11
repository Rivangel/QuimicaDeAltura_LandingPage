import { Component } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  imports: [],
  templateUrl: './sponsors.html',
  styleUrl: './sponsors.scss',
})
export class Sponsors {
  sponsors = [
    { name: 'CONACYT', fullName: 'Consejo Nacional de Ciencia y Tecnologia' },
    { name: 'UV', fullName: 'Universidad Veracruzana' },
    { name: 'TECNM', fullName: 'Tecnologico Nacional de Mexico' },
    { name: 'GOB. VER.', fullName: 'Gobierno del Estado de Veracruz' },
  ];
}
