import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-radial-menu',
  imports: [],
  templateUrl: './radial-menu.html',
  styleUrl: './radial-menu.scss',
})
export class RadialMenu {
  @Input() activeButton: string | null = null;
  @Output() contentChange = new EventEmitter<void>();
  @Output() setOriginalContent = new EventEmitter<void>();
  @Output() setMission = new EventEmitter<void>();
  @Output() setVision = new EventEmitter<void>();
  @Output() setValues = new EventEmitter<void>();
  @Output() setContact = new EventEmitter<void>();
  @Output() setBusinessModel = new EventEmitter<void>();

  onShowcaseButtonClick() {
    this.contentChange.emit();
  }

  onHeartButtonClick() {
    this.setOriginalContent.emit();
  }

  onMissionClick() {
    this.setMission.emit();
  }

  onVisionClick() {
    this.setVision.emit();
  }

  onValuesClick() {
    this.setValues.emit();
  }

  onContactClick() {
    this.setContact.emit();
  }

  onBusinessModelClick() {
    this.setBusinessModel.emit();
  }
}
