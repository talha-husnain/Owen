import { describe, expect, test, beforeAll } from "@jest/globals";
import CheckboxComponent from "./checkbox.component";
import { bootstrap } from "@gsilber/webez";

describe("CheckboxComponent", () => {
    let component: any = undefined;
    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<CheckboxComponent>(CheckboxComponent, html);
    });
    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(CheckboxComponent);
        });
    });
});
