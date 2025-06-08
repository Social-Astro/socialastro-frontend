import { Component, input, output } from "@angular/core";

@Component({
    selector: 'modal-confirm',
    standalone: true,
    imports: [],
    templateUrl: './modal-confirm.component.html',
    styleUrl: './modal-confirm.component.scss'
})
export class ModalConfirmComponent {
    message = input<string>();
    aceptar = output<void>();
    rechazar = output<void>();
}