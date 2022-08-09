import metrics100D from "./data/metric-100D.json";
import metricsP100D from "./data/metric-P100D.json";
import { normalizeTeslaModelData, calculateKm } from "./utils/utils";
import { initReactivity, watchReactive } from "./utils/reactivity";

import "./index.scss";

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

Object.keys(initialState).forEach((key) => {
  const [input] = document.getElementsByName(key);
  if (input) {
    input.checked = true;
    input.value = initialState[key];
  }
});

document
  .getElementById("battery-range-calculator")
  .addEventListener("change", ({ target: eventTarget }) => {
    const { name, value, checked, type } = eventTarget;
    const isCheckbox = type === "checkbox";
    const valueToUse = isCheckbox ? checked && "on" || "off" : value;

    model[name] = valueToUse;
  });

[...document.querySelectorAll(".arrow-controls")].forEach((elem) => {
  elem.addEventListener("click", ({ target: arrow }) => {
    const { name } = arrow;
    const control = arrow.getAttribute("control");
    const input = document.getElementById(name);
    if (control === "up") {
      input.stepUp();
    } else {
      input.stepDown();
    }
    const change = new Event("change", { bubbles: true });
    input.dispatchEvent(change);
  });
});

document.getElementById("tesla-fan").addEventListener("click", () => {
  const checkbox = document.getElementById("ac");
  checkbox.checked = !checkbox.checked;
  const change = new Event("change", { bubbles: true });
  checkbox.dispatchEvent(change);
});

const renderFunction = () => {
  document.getElementById("100D-km").innerHTML = model.d100Km;
  document.getElementById("P100D-km").innerHTML = model.pD100Km;
  const acLabel = document.getElementById("ac-label");
  const acFan = document.getElementById("tesla-fan");
  const acCheckbox = document.getElementById("ac");
  const modelAc = model.ac;
  const acOn = modelAc === "on";
  const tempMinus10 = model.temp <= 10;

  acCheckbox.checked = acOn;
  acLabel.innerHTML = `${tempMinus10 ? 'heat' : 'ac'} ${modelAc}`;
  if (acOn) {
    acFan.classList.add("tesla-fan--active");
  } else {
    acFan.classList.remove("tesla-fan--active");
  }
  // acOn && acFan.classList.toggle("tesla-fan--active");

  if (tempMinus10) {
    acFan.classList.add("tesla-heat");
  } else {
    acFan.classList.remove("tesla-heat");
  }
  // tempMinus10 && acFan.classList.toggle("tesla-heat")
};

watchReactive(() => {
  model.d100Km = calculateKm(normalizedD100, { ...model });
  model.pD100Km = calculateKm(normalizedP100D, { ...model });
});

watchReactive(renderFunction);

document
  .getElementById("print")
  .addEventListener("click", () => console.log({ model }));
