import { describe, expect, test, beforeAll } from "@jest/globals";
import { HabitAdderComponent } from "./habit-adder.component";
import { bootstrap } from "@gsilber/webez";

describe("HabitAdderComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<HabitAdderComponent>(HabitAdderComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(HabitAdderComponent);
        });
    });
});