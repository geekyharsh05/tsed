import {Hooks} from "./Hooks.js";

describe("Hooks", () => {
  describe("emit", () => {
    it("should listen a hook and calls listener", () => {
      const hooks = new Hooks();
      const fn = vi.fn();

      hooks.on("event", fn);

      hooks.emit("event", ["arg1"]);

      expect(fn).toHaveBeenCalledWith("arg1");

      hooks.off("event", fn);
    });
    it("should async listen a hook and calls listener", async () => {
      const hooks = new Hooks();
      const fn = vi.fn();

      hooks.on("event", fn);

      await hooks.asyncEmit("event", ["arg1"]);

      expect(fn).toHaveBeenCalledWith("arg1");

      hooks.off("event", fn);
    });
  });
  describe("alter", () => {
    it("should listen a hook and calls listener", () => {
      const hooks = new Hooks();
      const fn = vi.fn().mockReturnValue("valueAltered");

      hooks.on("event", fn);

      const value = hooks.alter("event", "value");

      expect(fn).toHaveBeenCalledWith("value");
      expect(value).toBe("valueAltered");

      hooks.off("event", fn);
    });
    it("should async listen a hook and calls listener", async () => {
      const hooks = new Hooks();
      const fn = vi.fn().mockReturnValue("valueAltered");

      hooks.on("event", fn);

      await hooks.asyncAlter("event", "value", ["arg1"]);

      expect(fn).toHaveBeenCalledWith("value", "arg1");

      hooks.off("event", fn);

      hooks.destroy();
    });
  });
});
