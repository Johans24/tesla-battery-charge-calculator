
const handleChangeFan = () => {
  const checkbox = document.getElementById("ac");
  checkbox.checked = !checkbox.checked;
  const change = new Event("change", { bubbles: true });
  checkbox.dispatchEvent(change);
}

export const loadBatteryRangeCalculator = () => {
  const batteryRangeCalc = document.getElementById("battery-range-calculator");
  document.getElementById("js-container").innerHTML = batteryRangeCalc.innerHTML;

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

  document.getElementById("tesla-fan").addEventListener("click", handleChangeFan);
  document.getElementById("tesla-fan").addEventListener("keyup", ({ key }) => {
    if (key === "Enter") handleChangeFan();
  });
};
