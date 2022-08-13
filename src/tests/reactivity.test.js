import { watchReactive } from "../js/reactivity";
import { initReactivity } from "../js/reactivity-utils";

describe("watchReactive", () => {
  it("should trigger callback function on change", () => {
    const reactiveObj = { foo: "bar" };
    const mockCallback = jest.fn();
    watchReactive(mockCallback);
    initReactivity(reactiveObj);
    reactiveObj.foo = "test"; // trigger a set event
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});

