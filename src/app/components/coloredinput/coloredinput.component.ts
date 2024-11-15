import { Component } from '@angular/core';
import { RainbowWriterDirective } from 'src/app/directives/rainbow-writer.directive';

@Component({
  selector: 'app-coloredinput',
  standalone: true,
  imports: [RainbowWriterDirective],
  templateUrl: './coloredinput.component.html',
  styleUrl: './coloredinput.component.css'
})
export class ColoredinputComponent {

}
