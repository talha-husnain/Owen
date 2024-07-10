import { beforeEach, describe, it, expect } from "@jest/globals";
import { HabitInterfaceComponent } from "./habit-interface.component";
import { bootstrap } from "@gsilber/webez";

describe("HabitInterfaceComponent Tests", () => {
    let habitInterface: HabitInterfaceComponent | undefined;

    beforeEach(() => {
        const testHtml: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        habitInterface = bootstrap<HabitInterfaceComponent>(
            HabitInterfaceComponent,
            testHtml,
        );
    });

    describe("Initialization", () => {
        it("should instantiate HabitInterfaceComponent", () => {
            expect(habitInterface).toBeInstanceOf(HabitInterfaceComponent);
        });
    });
});
