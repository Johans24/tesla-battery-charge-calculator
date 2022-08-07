import metrics100D from "./data/metric-100D.json"; 

import metricsP100D from "./data/metric-P100D.json";

import "./index.scss";


const normalizeData = data => {
  return data.reduce((normalizedData, curr) => {
    const { wheelsize, temp, ac, hwy } = curr;
    normalizedData.byWheelsize = {
      ...normalizedData.byWheelsize,
      [wheelsize]: {
        ["byAc"]: {
          ...(normalizedData.byWheelsize?.[wheelsize]?.byAc ?? {}),
          [ac]: {
            ["byTemp"]: {
              ...(normalizedData.byWheelsize?.[wheelsize]?.byAc[ac]?.byTemp ?? {}),
              [temp]: hwy,
            },
          },
        },
      },
    };
    return normalizedData;
  }, {});
}

const normalizedD100 = normalizeData(metrics100D);
const normalizedP100D = normalizeData(metricsP100D);

const obj = {
  kmh: 0,
  temp: 0,
  ac: "off",
  wheelsize: 19,
  d100Km: 0,
  pD100Km: 0
};

let target = null;
class Reactive {
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

Object.keys(obj).forEach((key) => {
  let innerValue = obj[key];
  const reactive = new Reactive();
  Object.defineProperty(obj, key, {
    get() {
      reactive.track();
      return innerValue;
    },

    set(newValue) {
      innerValue = newValue;
      reactive.trigger();
    },
  });
});

const watchReactive = (callback) => {
  target = callback;
  target();
  target = null;
};

const calculateKm = data => {
  return data.byWheelsize?.[obj.wheelsize]?.byAc[obj.ac]?.byTemp[obj.temp]?.find(
    ({ kmh }) => obj.kmh == kmh
  )?.kilometers ?? 0;
}

watchReactive(() => {
  obj.d100Km = calculateKm(normalizedD100);

  obj.pD100Km = calculateKm(normalizedP100D);
});

const renderFunction = () => {
  document.getElementById("100D-km").innerHTML = obj.d100Km;
  document.getElementById("P100D-km").innerHTML = obj.pD100Km;
};

watchReactive(renderFunction);

document
  .getElementById("battery-range-calculator")
  .addEventListener("change", ({ target: eventTarget }) => {
    const { name, value } = eventTarget;

    obj[name] = value;
  });

document.getElementById("print").addEventListener("click", () => {
  console.log({ obj });
});
