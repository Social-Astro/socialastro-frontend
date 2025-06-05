import { Component, input } from '@angular/core';

@Component({
  selector: 'load-button[type=submit]',
  imports: [],
  templateUrl: './load-button.component.html',
  styleUrl: './load-button.component.scss'
})
export class LoadButtonComponent {
  colorClass = input('btn-primary');
  loading = input(false);
  formInvalid = input(false);
}
