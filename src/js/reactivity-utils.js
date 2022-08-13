import { Reactive } from "./reactivity.js";

export const initReactivity = (obj) => {
  Object.keys(obj).forEach((key) => {
    let innerValue = obj[key];
    const reactive = new Reactive();
    Object.defineProperty(obj, key, {
      get() {
        reactive.track();
        return innerValue;
      },

      set(newValue) {
        if (innerValue !== newValue) {
          innerValue = newValue;
          reactive.trigger();
        }
      },
    });
  });

  return obj;
};
