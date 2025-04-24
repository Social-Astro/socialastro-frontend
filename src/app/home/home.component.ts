import { Component, DestroyRef, inject, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TopicsService } from "./services/topics.service";
import { TopicsFormComponent } from "./topics/topics-form/topics-form.component";

@Component({
    selector: 'home',
    imports: [RouterOutlet, TopicsFormComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    readonly #topicsService = inject(TopicsService);
    readonly #destroyRef = inject(DestroyRef);

    showForm = signal(false);

    showTopicsForm(state: boolean) {
        this.showForm.set(state); //TODO: Debe actualizarse automáticamente
    }
}