import {
    BindCheckedToBoolean,
    BindValue,
    Click,
    EventSubject,
    EzComponent,
} from "@gsilber/webez";
import html from "./checkbox.component.html";
import css from "./checkbox.component.css";
import GraphComponent from "../graph/graph.component";

export default class CheckboxComponent extends EzComponent {
    @BindCheckedToBoolean("checkHabit")
    public isChecked: boolean = false;

    @BindValue("checkboxLabel")
    private label: string = "";

    public today: string;
    private completionDates: Set<string> = new Set();
    private graphUpdater: EventSubject<number> = new EventSubject<number>();
    private graph: GraphComponent;

    constructor(label: string, graph: GraphComponent) {
        super(html, css);
        this.label = label;
        this.graph = graph;
        this.today = this.getFormattedDate(new Date());
    }

    /**
     * Formats a date object to a string in YYYY-MM-DD format.
     * @param date - The date to format.
     * @returns The formatted date string.
     */
    private getFormattedDate(date: Date): string {
        return date.toISOString().split("T")[0];
    }

    /**
     * Toggles the checkbox state and updates completion dates accordingly.
     */
    @Click("checkHabit")
    private handleCheckboxToggle() {
        this.isChecked = !this.isChecked;
        this.updateCompletionDates();
        this.logState();
    }

    /**
     * Updates the completion dates and graph based on the checkbox state.
     */
    private updateCompletionDates() {
        if (this.isChecked) {
            this.addCompletionDate();
        } else {
            this.removeCompletionDate();
        }
    }

    /**
     * Adds today's date to the completion dates set and increments the graph.
     */
    private addCompletionDate() {
        if (!this.completionDates.has(this.today)) {
            this.completionDates.add(this.today);
            this.graph.adjustBarWidth(20);
        }
    }

    /**
     * Removes today's date from the completion dates set and decrements the graph.
     */
    private removeCompletionDate() {
        if (this.completionDates.has(this.today)) {
            this.completionDates.delete(this.today);
            this.graph.adjustBarWidth(-20);
        }
    }

    /**
     * Logs the current state of completion dates and checkbox state.
     */
    private logState() {
        console.log("Completion Dates: ", Array.from(this.completionDates));
        console.log("Checkbox State: ", this.isChecked);
    }

    /**
     * Gets the list of completion dates as an array.
     * @returns An array of completion dates.
     */
    public getCompletionDates(): string[] {
        return Array.from(this.completionDates);
    }

    /**
     * Public method to toggle the checkbox state.
     */
    public toggle() {
        this.handleCheckboxToggle();
    }
}
