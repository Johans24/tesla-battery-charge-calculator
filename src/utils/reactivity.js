let target = null;

export class Reactive {
  constructor() {
    this.effects = new Set();
  }

  track() {
    if (target && !this.effects.has(target)) {
      this.effects.add(target);
    }
  }

  trigger() {
    this.effects.forEach((effect) => effect());
  }
}

export const initReactivity = obj => {
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
}

export const watchReactive = (callback) => {
  target = callback;
  target();
  target = null;
};