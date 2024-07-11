import { describe, expect, test, beforeAll } from "@jest/globals";
import GraphComponent from "./graph.component";
import { bootstrap } from "@gsilber/webez";

describe("GraphComponent", () => {
    let component: any = undefined;

    beforeAll(() => {
        const html: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        component = bootstrap<GraphComponent>(GraphComponent, html);
    });

    describe("Constructor", () => {
        test("Create Instance", () => {
            expect(component).toBeInstanceOf(GraphComponent);
        });
    });
});
