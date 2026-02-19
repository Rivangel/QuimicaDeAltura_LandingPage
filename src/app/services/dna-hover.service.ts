import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DnaHoverService {
  private hoverTextSubject = new BehaviorSubject<string | null>(null);
  public hoverText$: Observable<string | null> = this.hoverTextSubject.asObservable();

  setHoverText(text: string | null) {
    this.hoverTextSubject.next(text);
  }
}

