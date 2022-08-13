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

export const watchReactive = (callback) => {
  target = callback;
  target();
  target = null;
};