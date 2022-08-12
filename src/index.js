import "core-js/stable";
import metrics100D from "./data/metric-100D.json";
import metricsP100D from "./data/metric-P100D.json";
import { normalizeTeslaModelData, calculateKm } from "./js/utils";
import { initReactivity, watchReactive } from "./js/reactivity";

import "./index.html";
import "./index.scss";
import { loadBatteryRangeCalculator } from "./js/dom";

const normalizedD100 = normalizeTeslaModelData(metrics100D);
const normalizedP100D = normalizeTeslaModelData(metricsP100D);

const initialState = {
  kmh: 70,
  temp: -10,
  ac: "off",
  wheelsize: 19,
  d100Km: 0,
  pD100Km: 0,
};

const model = initReactivity(initialState);
loadBatteryRangeCalculator();

Object.keys(initialState).forEach((key) => {
  const [input] = document.getElementsByName(key);
  if (input) {
    input.checked = true;
    input.value = initialState[key];
  }
});

document
  .getElementById("battery-range-calculator-inputs")
  .addEventListener("change", ({ target: eventTarget }) => {
    const { name, value, checked, type } = eventTarget;
    const isCheckbox = type === "checkbox";
    const valueToUse = isCheckbox ? (checked && "on") || "off" : value;

    model[name] = valueToUse;
  });


const renderFunction = () => {
  document.getElementById("100D-km").innerHTML = model.d100Km;
  document.getElementById("P100D-km").innerHTML = model.pD100Km;
  const wheels = [...document.querySelectorAll(".tesla-wheels")];
  const acLabel = document.getElementById("ac-label");
  const acFan = document.getElementById("tesla-fan");
  const acCheckbox = document.getElementById("ac");
  const modelAc = model.ac;
  const modelWheelsize = model.wheelsize;
  const acOn = modelAc === "on";
  const tempMinus10 = model.temp <= 10;

  acCheckbox.checked = acOn;
  acLabel.innerHTML = `${tempMinus10 ? "heat" : "ac"} ${modelAc}`;

  wheels.forEach((wheel) => {
    wheel.classList.toggle("tesla-car__img--19", modelWheelsize == "19");
    wheel.classList.toggle("tesla-car__img--21", modelWheelsize == "21");
  });

  acFan.classList.toggle("tesla-fan--active", acOn);
  acFan.classList.toggle("tesla-heat", tempMinus10);
};

watchReactive(() => {
  model.d100Km = calculateKm(normalizedD100, { ...model });
  model.pD100Km = calculateKm(normalizedP100D, { ...model });
});

watchReactive(renderFunction);
