import {descriptorOf, Store} from "@tsed/core";
import {Pulse} from "./pulse";
import {Every} from "./every.js";

describe("@Every()", () => {
  it("should set metadata", () => {
    @Pulse()
    class Test {
      @Every("60 seconds")
      testEveryDecorator() {
        // test
      }

      @Every("* * * * *")
      testEveryDecorator2() {
        // test 2
      }
    }

    const store = Store.from(Test);

    expect(store.get("pulse").define).toEqual({
      testEveryDecorator: {},
      testEveryDecorator2: {}
    });

    expect(store.get("pulse").every).toEqual({
      testEveryDecorator: {
        interval: "60 seconds"
      },
      testEveryDecorator2: {
        interval: "* * * * *"
      }
    });
  });
});
