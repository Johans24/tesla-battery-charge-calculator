import metrics100D from "./data/metric-100D.json";
import metricsP100D from "./data/metric-P100D.json";
import {
  normalizeTeslaModelData,
  calculateKm,
  getAttributes,
  clamp,
} from "./utils/utils";
import { initReactivity, watchReactive } from "./utils/reactivity";

import "./index.scss";

const normalizedD100 = normalizeTeslaModelData(metrics100D);
const normalizedP100D = normalizeTeslaModelData(metricsP100D);

const model = initReactivity({
  kmh: 70,
  temp: -10,
  ac: "off",
  wheelsize: 21,
  d100Km: 0,
  pD100Km: 0,
});
const updateDomInputs = () => {
  const reactiveLessModel = { ...model };
  Object.keys(reactiveLessModel).forEach((key) => {
    const [input] = document.getElementsByName(key);
    if (input && input.value !== reactiveLessModel[key]) {
      input.value = reactiveLessModel[key];
      input.checked = true;
    }
  });
};

// document
//   .getElementById("battery-range-calculator")
//   .addEventListener("change", ({ target: eventTarget }) => {
//     const { name, value, checked, type } = eventTarget;
//     const isCheckbox = type === "checkbox";
//     const valueToUse = isCheckbox ? (checked && "on") || "off" : value;

//     model[name] = valueToUse;
//   });

[...document.querySelectorAll(".arrow-controls")].forEach(elem => {
  elem.addEventListener("click", ({ target: arrow }) => {
    const { name } = arrow;
    const input = document.getElementById(name);
    const { step, min, max } = getAttributes(input, ["step", "min", "max"]);
    const action = arrow.getAttribute("control");
    const stepCalculated = (action === "up" ? 1 : -1) * step;

    model[name] = clamp(stepCalculated + { ...model }[name], min, max);
  });
});

const renderFunction = () => {
  document.getElementById("100D-km").innerHTML = model.d100Km;
  document.getElementById("P100D-km").innerHTML = model.pD100Km;
  updateDomInputs();
};

watchReactive(() => {
  model.d100Km = calculateKm(normalizedD100, model);
  model.pD100Km = calculateKm(normalizedP100D, model);
});

watchReactive(renderFunction);

document
  .getElementById("print")
  .addEventListener("click", () =>
    console.log({ bla: document.querySelector(".tesla-controls--arrows") })
  );
