import {
    BindCheckedToBoolean,
    BindValue,
    Click,
    EventSubject,
    EzComponent,
} from "@gsilber/webez";
import html from "./checkbox.component.html";
import css from "./checkbox.component.css";
import GraphComponent from "../graph/graph.component"; // Ensure correct import

export class CheckboxComponent extends EzComponent {
    @BindCheckedToBoolean("checkHabit")
    public isChecked: boolean = false;

    @BindValue("checkboxLabel")
    private label: string = "";

    public currentDate: string;
    private completionDates: Set<string> = new Set();
    private graphUpdater: EventSubject<number> = new EventSubject<number>();
    private graphComponent: GraphComponent;

    constructor(label: string, graphComponent: GraphComponent) {
        super(html, css);
        this.label = label;
        this.graphComponent = graphComponent;
        this.currentDate = this.formatDate(new Date());
    }

    private formatDate(date: Date): string {
        return date.toISOString().split("T")[0];
    }

    @Click("checkHabit")
    private toggleCheckbox() {
        this.isChecked = !this.isChecked;
        if (this.isChecked) {
            this.addCompletionDate();
        } else {
            this.removeCompletionDate();
        }
        console.log("Completion Dates: ", Array.from(this.completionDates));
        console.log("Checkbox State: ", this.isChecked);
    }

    private addCompletionDate() {
        if (!this.completionDates.has(this.currentDate)) {
            this.completionDates.add(this.currentDate);
            this.graphComponent.graphIncrement(20);
        }
    }

    private removeCompletionDate() {
        if (this.completionDates.has(this.currentDate)) {
            this.completionDates.delete(this.currentDate);
            this.graphComponent.graphIncrement(-20);
        }
    }

    public getCompletionDates(): string[] {
        return Array.from(this.completionDates);
    }
}

export default CheckboxComponent;
