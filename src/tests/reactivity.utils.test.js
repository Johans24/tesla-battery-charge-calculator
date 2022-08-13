import { initReactivity } from "../js/reactivity-utils";
const mockTrack = jest.fn();
const mockTrigger = jest.fn();
jest.mock("../js/reactivity", () => {
  return {
    Reactive: jest.fn().mockImplementation(() => {
      return { track: mockTrack, trigger: mockTrigger };
    }),
  };
});

describe("initReactivity", () => {
  it("initReactivity should add getters and setters", () => {
    const reactiveObj = { foo: "bar" };
    expect(initReactivity(reactiveObj)).toBe(reactiveObj);
    reactiveObj.foo = "test"; // trigger a set event
    expect(mockTrigger.mock.calls.length).toBe(1);
    expect(reactiveObj.foo).toBe("test"); // trigger a get event
    expect(mockTrack.mock.calls.length).toBe(1);
  });
});
