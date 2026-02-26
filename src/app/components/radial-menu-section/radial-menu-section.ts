import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadialMenu } from '../radial-menu/radial-menu';
import { CardContent } from '../../models/card-content.interface';

@Component({
  selector: 'app-radial-menu-section',
  standalone: true,
  imports: [CommonModule, RadialMenu],
  templateUrl: './radial-menu-section.html',
  styleUrl: './radial-menu-section.scss'
})
export class RadialMenuSection implements AfterViewInit {
  @ViewChild('contentWrapper') contentWrapperRef!: ElementRef<HTMLElement>;

  @Input({ required: true }) cardContent!: Signal<CardContent>;
  @Input({ required: true }) activeButton!: Signal<string | null>;

  @Output() contentChange = new EventEmitter<void>();
  @Output() setOriginalContent = new EventEmitter<void>();
  @Output() setMission = new EventEmitter<void>();
  @Output() setVision = new EventEmitter<void>();
  @Output() setValues = new EventEmitter<void>();
  @Output() setContact = new EventEmitter<void>();
  @Output() setBusinessModel = new EventEmitter<void>();

  get titleLines() {
    return this.cardContent().title.split('\n');
  }

  ngAfterViewInit() {
    const el = this.contentWrapperRef.nativeElement;
    el.style.height = el.offsetHeight + 'px';
  }

  onContentChange() {
    this.contentChange.emit();
  }

  onSetOriginalContent() {
    this.setOriginalContent.emit();
  }

  onSetMission() {
    this.setMission.emit();
  }

  onSetVision() {
    this.setVision.emit();
  }

  onSetValues() {
    this.setValues.emit();
  }

  onSetContact() {
    this.setContact.emit();
  }

  onSetBusinessModel() {
    this.setBusinessModel.emit();
  }
}
