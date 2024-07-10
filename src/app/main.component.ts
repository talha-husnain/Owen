import { EzComponent } from "@gsilber/webez";
import html from "./main.component.html";
import css from "./main.component.css";
import { HabitInterfaceComponent } from "./habit-interface/habit-interface.component";

export class MainComponent extends EzComponent {
    public addHabit = new HabitInterfaceComponent();
    constructor() {
        super(html, css);
        this.addComponent(this.addHabit, "add-habit");
    }
}

export default MainComponent; // Ensure MainComponent is exported
