import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CapitalComponent } from "./components/capital/capital.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CapitalComponent]
})
export class AppComponent {
  title = 'country-quiz';
  data = { Germany: "Berlin", Azerbaijan: "Baku" };

}
