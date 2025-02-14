import {ActionCtx} from "./actionCtx.js";
import {JsonParameterStore} from "@tsed/schema";

describe("@ActionCtx", () => {
  it("should inject ActionCtx", () => {
    class CustomAction {
      resolve(@ActionCtx() actionCtx: ActionCtx) {}
    }

    const param = JsonParameterStore.get(CustomAction, "resolve", 0);

    expect(param.expression).toEqual("ACTION_CTX");
  });

  it("should inject ActionCtx (with expression)", () => {
    class CustomAction {
      resolve(@ActionCtx("handler") actionCtx: ActionCtx) {}
    }

    const param = JsonParameterStore.get(CustomAction, "resolve", 0);

    expect(param.expression).toEqual("ACTION_CTX.handler");
  });
});
