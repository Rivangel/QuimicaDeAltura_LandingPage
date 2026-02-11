import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  imports: [],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.scss',
})
export class HowItWorks {
  steps = [
    {
      number: 1,
      icon: '📲',
      title: 'Descarga la App',
      description: 'Disponible gratis en Google Play y App Store. Instalala en segundos y comienza a descubrir plantas medicinales.'
    },
    {
      number: 2,
      icon: '🔍',
      title: 'Escanea una Planta',
      description: 'Usa la camara de tu telefono para identificar plantas medicinales con nuestra IA avanzada.'
    },
    {
      number: 3,
      icon: '🌿',
      title: 'Descubre sus Beneficios',
      description: 'Recibe informacion detallada sobre propiedades, usos tradicionales y evidencia cientifica.'
    }
  ];
}
