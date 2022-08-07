import metrics100D from "./data/metric-100D.json";
import metricsP100D from "./data/metric-P100D.json";
import { normalizeTeslaModelData, calculateKm } from "./utils/utils";
import { initReactivity, watchReactive } from "./utils/reactivity";

import "./index.scss";

const normalizedD100 = normalizeTeslaModelData(metrics100D);
const normalizedP100D = normalizeTeslaModelData(metricsP100D);

const state = {
  kmh: 70,
  temp: -10,
  ac: "off",
  wheelsize: 21,
  d100Km: 0,
  pD100Km: 0,
};

const model = initReactivity(state);

//DOM Manipulation
Object.keys(state).forEach((key) => {
  const [input] = document.getElementsByName(key);
  if (input) {
    input.value = state[key];
    input.checked = true;
  }
});

document
  .getElementById("battery-range-calculator")
  .addEventListener("change", ({ target: eventTarget }) => {
    const { name, value, checked, type } = eventTarget;
    const isCheckbox = type === "checkbox";
    const valueToUse = isCheckbox ? (checked && "on") || "off" : value;

    model[name] = valueToUse;
  });

const renderFunction = () => {
  document.getElementById("100D-km").innerHTML = model.d100Km;
  document.getElementById("P100D-km").innerHTML = model.pD100Km;
};

watchReactive(() => {
  model.d100Km = calculateKm(normalizedD100, model);
  model.pD100Km = calculateKm(normalizedP100D, model);
});

watchReactive(renderFunction);
