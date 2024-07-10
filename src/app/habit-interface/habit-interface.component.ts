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
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { GraphComponent } from "../graph/graph.component";

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
    private date: string;

    private currentDate: Date = new Date();
    private checker: number = 0;
    private dateEvent: EventSubject<string> = new EventSubject<string>();
    private graphs: GraphComponent[] = [];
    private items: HabitAdderComponent[] = [];
    private tracking: CheckboxComponent[] = [];

    constructor() {
        super(html, css);
        this.date = this.formatDate(this.currentDate);
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    private updateDate(day: number): void {
        const newDate = new Date(this.date);
        newDate.setDate(newDate.getDate() + day);
        this.date = newDate.toISOString().split("T")[0];
        this.updateTrackingDates();
    }

    private updateTrackingDates(): void {
        this.tracking.forEach((tracker) => {
            tracker.currentDate = this.date;
            tracker.isChecked = tracker
                .getCompletionDates()
                .includes(this.date);
            console.log(
                tracker.getCompletionDates(),
                this.date,
                tracker.isChecked,
            );
        });
    }

    private createHabitComponent(
        name: string,
        goal: number,
        graph: GraphComponent,
    ): HabitAdderComponent {
        return new HabitAdderComponent(name, goal, graph);
    }

    private addHabit(name: string, goal: number): void {
        this.checker = 0;
        const newGraph = new GraphComponent(name);
        const newItem = this.createHabitComponent(name, goal, newGraph);

        if (this.items.some((item) => item.getHabitName() === name)) {
            this.fail = `Habit already exists: ${name}`;
            this.checker = 1;
        }

        if (this.checker === 0) {
            this.graphs.push(newGraph);
            this.items.push(newItem);
            this.tracking.push(newItem.checkbox);
            this.addComponent(newGraph, "bar-graph");
            this.addComponent(newItem, "habitDetails");
            this.addComponent(newItem.checkbox, "trackHabits");
            this.count++;
        }
    }

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
        this.date = e.value;
    }

    @Click("previous-week")
    private onPreviousWeekClick(): void {
        this.updateDate(-7);
    }

    @Click("next-week")
    private onNextWeekClick(): void {
        this.updateDate(7);
    }

    @Click("next-day")
    private onNextDayClick(): void {
        this.updateDate(1);
    }

    @Click("previous-day")
    private onPreviousDayClick(): void {
        this.updateDate(-1);
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
