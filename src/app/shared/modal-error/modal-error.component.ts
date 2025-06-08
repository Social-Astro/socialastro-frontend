import { Component, input } from "@angular/core";

@Component({
    selector: 'modal-error',
    standalone: true,
    imports: [],
    templateUrl: './modal-error.component.html',
    styleUrl: './modal-error.component.scss'
})
export class ModalErrorComponent {
    error = input.required<string>();
}