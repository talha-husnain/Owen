import { beforeEach, describe, it, expect } from "@jest/globals";
import { MainComponent } from "./main.component";
import { bootstrap } from "@gsilber/webez";

describe("MainComponent Tests", () => {
    let mainComponent: MainComponent | undefined;

    beforeEach(() => {
        const testHtml: string = `<div>Testing Environment</div><div id='main-target'></div>`;
        mainComponent = bootstrap<MainComponent>(MainComponent, testHtml);
    });

    describe("Initialization", () => {
        it("should instantiate MainComponent", () => {
            expect(mainComponent).toBeInstanceOf(MainComponent);
        });
    });
});
