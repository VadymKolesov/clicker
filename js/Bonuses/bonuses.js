const balanceCoin = document.getElementById("coin");
const coinClick = document.querySelector(".coin-btn");

let state = JSON.parse(localStorage.getItem("Quantity")) || {};
let clickQuantity = state.clickQuantity || 0;

balanceCoin.textContent = clickQuantity;

coinClick.addEventListener("click", () => {
  clickQuantity += 1;
  balanceCoin.textContent = clickQuantity;

  state = { clickQuantity };
  localStorage.setItem("Quantity", JSON.stringify(state));
});
