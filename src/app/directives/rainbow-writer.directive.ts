import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'input[appRainbowWriter]' , 
  standalone: true, // Only applies to input elements
})
export class RainbowWriterDirective {
  private colors: string[] = [
    'red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'
  ];

  @HostBinding('style.color') textColor!: string;
  @HostBinding('style.borderColor') borderColor!: string;

  constructor(private el: ElementRef) {}

  // Event listener for keyup event
  @HostListener('keyup') onKeyUp() {
    const randomColor = this.getRandomColor();
    this.textColor = randomColor;
    this.borderColor = randomColor;
  }

  private getRandomColor(): string {
    const index = Math.floor(Math.random() * this.colors.length);
    return this.colors[index];
  }
}

