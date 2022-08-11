export const loadBatteryRangeCalculator = () => {
  const temp = document.getElementById("battery-range-calculator");
  const clone = temp.content.cloneNode(true);
  document.getElementById("js-container").appendChild(clone);

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
};
