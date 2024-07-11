import {
    BindStyleToNumberAppendPx,
    BindValue,
    EventSubject,
    EzComponent,
} from "@gsilber/webez";
import html from "./graph.component.html";
import css from "./graph.component.css";

export default class GraphComponent extends EzComponent {
    @BindValue("habit-name")
    private habitName: string;

    @BindStyleToNumberAppendPx("bar-element", "width")
    public barWidth: number = 25;

    private graphUpdateEvent: EventSubject<number> = new EventSubject<number>();

    constructor(habitName: string) {
        super(html, css);
        this.habitName = habitName;
    }

    /**
     * Adjusts the width of the graph bar based on the amount provided.
     *
     * @param amount - The pixels to add or remove from the graph bar width.
     */
    public adjustBarWidth(amount: number): void {
        this.barWidth += amount;
    }
}
