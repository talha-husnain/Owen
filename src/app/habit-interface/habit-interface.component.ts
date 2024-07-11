import { EventSubject, EzComponent } from "@gsilber/webez";
import html from "./habit-interface.component.html";
import css from "./habit-interface.component.css";
import {
    BindValue,
    BindValueToNumber,
    Click,
    Input,
    ValueEvent,
} from "@gsilber/webez";
import { HabitAdderComponent } from "../habit-adder/habit-adder.component";
import CheckboxComponent from "../checkbox/checkbox.component";
import GraphComponent from "../graph/graph.component";

export class HabitInterfaceComponent extends EzComponent {
    @BindValue("habitName")
    private habitName: string = "Code";

    @BindValueToNumber("goals")
    private goal: number = 7;

    @BindValueToNumber("counter", " habits added")
    private count: number = 0;

    @BindValue("fail")
    private fail: string = "";

    @BindValue("calendar")
    private selectedDate: string;

    private currentDate: Date = new Date();
    private dateEvent: EventSubject<string> = new EventSubject<string>();
    private graphs: GraphComponent[] = [];
    private items: HabitAdderComponent[] = [];
    private tracking: CheckboxComponent[] = [];

    constructor() {
        super(html, css);
        this.selectedDate = this.formatDate(this.currentDate);
    }

    /**
     * Formats a date object to a string in YYYY-MM-DD format.
     * @param date - The date to format.
     * @returns The formatted date string.
     */
    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    /**
     * Updates the selected date by adding or subtracting days.
     * @param days - The number of days to add or subtract.
     */
    private updateSelectedDate(days: number): void {
        const newDate = new Date(this.selectedDate);
        newDate.setDate(newDate.getDate() + days);
        this.selectedDate = newDate.toISOString().split("T")[0];
        this.refreshTrackingDates();
    }

    /**
     * Refreshes the tracking dates for each habit.
     */
    private refreshTrackingDates(): void {
        this.tracking.forEach((tracker) => {
            tracker.today = this.selectedDate;
            tracker.isChecked = tracker
                .getCompletionDates()
                .includes(this.selectedDate);
            console.log(
                tracker.getCompletionDates(),
                this.selectedDate,
                tracker.isChecked,
            );
        });
    }

    /**
     * Creates a new habit component.
     * @param name - The name of the habit.
     * @param goal - The goal for the habit.
     * @param graph - The graph component for the habit.
     * @returns A new HabitAdderComponent instance.
     */
    private createHabitComponent(
        name: string,
        goal: number,
        graph: GraphComponent,
    ): HabitAdderComponent {
        return new HabitAdderComponent(name, goal, graph);
    }

    /**
     * Adds a new habit to the interface.
     * @param name - The name of the habit.
     * @param goal - The goal for the habit.
     */
    private addHabit(name: string, goal: number): void {
        const habitExists = this.items.some(
            (item) => item.getHabitName() === name,
        );
        if (habitExists) {
            this.fail = `Habit already exists: ${name}`;
            return;
        }

        const newGraph = new GraphComponent(name);
        const newItem = this.createHabitComponent(name, goal, newGraph);

        this.graphs.push(newGraph);
        this.items.push(newItem);
        this.tracking.push(newItem.checkbox);
        this.addComponent(newGraph, "bar-graph");
        this.addComponent(newItem, "habitDetails");
        this.addComponent(newItem.checkbox, "trackHabits");
        this.count++;
    }

    /**
     * Removes the last added habit from the interface.
     */
    private removeLastHabit(): void {
        if (this.items.length > 0) {
            const lastItem = this.items.pop();
            const lastGraph = this.graphs.pop();
            const lastTracker = this.tracking.pop();

            if (lastItem) {
                this.removeComponent(lastItem);
                this.removeComponent(lastItem.checkbox);
            }
            if (lastGraph) this.removeComponent(lastGraph);

            this.count--;
        }
    }

    @Input("calendar")
    private onDateChange(e: ValueEvent): void {
        this.selectedDate = e.value;
    }

    @Click("previous-week")
    private onPreviousWeekClick(): void {
        this.updateSelectedDate(-7);
    }

    @Click("next-week")
    private onNextWeekClick(): void {
        this.updateSelectedDate(7);
    }

    @Click("next-day")
    private onNextDayClick(): void {
        this.updateSelectedDate(1);
    }

    @Click("previous-day")
    private onPreviousDayClick(): void {
        this.updateSelectedDate(-1);
    }

    @Input("habitName")
    private onHabitNameChange(e: ValueEvent): void {
        this.habitName = e.value;
    }

    @Input("goals")
    private onGoalAmountChange(e: ValueEvent): void {
        this.goal = +e.value;
    }

    @Click("cancel-habit")
    private onCancelHabitClick(): void {
        this.removeLastHabit();
    }

    @Click("gym")
    private onGymClick(): void {
        this.addHabit("Gym", 3);
    }

    @Click("read")
    private onReadClick(): void {
        this.addHabit("Read", 3);
    }

    @Click("study")
    private onStudyClick(): void {
        this.addHabit("Study", 3);
    }

    @Click("add-habit-button")
    private onAddClick(): void {
        this.addHabit(this.habitName, this.goal);
    }
}
