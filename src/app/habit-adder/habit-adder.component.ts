import { EzComponent, BindValue, BindValueToNumber } from "@gsilber/webez";
import html from "./habit-adder.component.html";
import css from "./habit-adder.component.css";
import CheckboxComponent from "../checkbox/checkbox.component";
import GraphComponent from "../graph/graph.component";

export class HabitAdderComponent extends EzComponent {
    @BindValue("habits")
    private habitName: string;

    @BindValueToNumber("goal-per-week")
    private goalNumber: number;

    public checkbox: CheckboxComponent;
    public graph: GraphComponent;

    constructor(habitName: string, goalNumber: number, graph: GraphComponent) {
        super(html, css);
        this.habitName = habitName;
        this.goalNumber = goalNumber;
        this.checkbox = this.createCheckboxComponent(habitName, graph);
        this.graph = graph;
    }

    /**
     * Creates a new CheckboxComponent instance.
     * @param habitName - The name of the habit.
     * @param graph - The associated GraphComponent instance.
     * @returns A new CheckboxComponent instance.
     */
    private createCheckboxComponent(
        habitName: string,
        graph: GraphComponent,
    ): CheckboxComponent {
        return new CheckboxComponent(habitName, graph);
    }

    /**
     * Gets the habit name.
     * @returns The habit name as a string.
     */
    public getHabitName(): string {
        return this.habitName;
    }

    /**
     * Sets a new habit name.
     * @param newHabitName - The new habit name.
     */
    public setHabitName(newHabitName: string): void {
        this.habitName = newHabitName;
    }

    /**
     * Gets the goal number.
     * @returns The goal number.
     */
    public getGoalNumber(): number {
        return this.goalNumber;
    }

    /**
     * Sets a new goal number.
     * @param newGoalNumber - The new goal number.
     */
    public setGoalNumber(newGoalNumber: number): void {
        this.goalNumber = newGoalNumber;
    }

    /**
     * Updates the associated graph component with a given amount.
     * @param amount - The amount to adjust the graph by.
     */
    public updateGraph(amount: number): void {
        this.graph.adjustBarWidth(amount);
    }

    /**
     * Toggles the checkbox state and updates the completion dates accordingly.
     */
    public toggleCheckbox(): void {
        this.checkbox.toggle();
    }
}

export default HabitAdderComponent;
