import { Component, DestroyRef, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { TopicsService } from "./services/topics.service";

@Component({
    selector: 'home',
    imports: [RouterOutlet],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    readonly #topicsService = inject(TopicsService);
    readonly #destroyRef = inject(DestroyRef);
}