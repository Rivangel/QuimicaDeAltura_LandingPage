import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.scss',
})
export class Newsletter {
  email = '';
  submitted = signal(false);

  onSubmit() {
    if (this.email) {
      this.submitted.set(true);
      this.email = '';
    }
  }
}
