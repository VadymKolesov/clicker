let renderedPerks = "";

function addPerks(source) {
  for (let key in source) {
    renderedPerks =
      renderedPerks +
      `<li>
    <button type="button" name="${key}" class="perk-btn">${source[key].title}</button>
    <p class="cost">${source[key].cost}</p>
  </li>`;
  }
  return renderedPerks;
}

document.querySelector("#perksItems").innerHTML = addPerks(perks);

const refs = {
  scoreTitle: document.querySelector(".score-title"),
  coinBtn: document.querySelector(".coin-btn"),
  coinImage: document.querySelector(".coin-img"),
  perksList: document.querySelector(".perks-section"),
  perksItems: document.querySelector("#perksItems"),
  costValue: document.querySelector(".cost"),
  //   wood: document.querySelector("[name=wood]"),
  //   silver: document.querySelector("[name=silver]"),
  //   gold: document.querySelector("[name=gold]"),
};

let SCORES = 0;
let POWER = 1;

if (localStorage.getItem("scores")) {
  SCORES = Number(localStorage.getItem("scores"));
}

if (localStorage.getItem("power")) {
  POWER = Number(localStorage.getItem("power"));
} else {
  localStorage.setItem("power", 1);
}

for (let key in perks) {
  if (POWER >= perks[key].power) {
    document.querySelector(`[name=${key}]`).disabled = true;
    document
      .querySelector(`[name=${key}]`)
      .nextElementSibling.classList.add("buyed");
    continue;
  }

  if (SCORES < perks[key].cost) {
    document.querySelector(`[name=${key}]`).disabled = true;
    document
      .querySelector(`[name=${key}]`)
      .nextElementSibling.classList.add("cant-buy");
  } else if (SCORES >= perks[key].cost) {
    document.querySelector(`[name=${key}]`).disabled = false;
    document
      .querySelector(`[name=${key}]`)
      .nextElementSibling.classList.add("can-buy");
  }
}

refs.coinBtn.addEventListener("click", addScore);

function addScore() {
  SCORES += POWER;
  localStorage.setItem("scores", SCORES);
  refs.scoreTitle.textContent = SCORES;
  refs.coinImage.style.transform = "scale(0.95)";
  setTimeout(() => {
    refs.coinImage.style.transform = "scale(1)";
  }, 15);
  for (let key in perks) {
    if (SCORES >= perks[key].cost && POWER < perks[key].power) {
      document.querySelector(`[name=${key}]`).disabled = false;
      document
        .querySelector(`[name=${key}]`)
        .nextElementSibling.classList.remove("cant-buy");
      document
        .querySelector(`[name=${key}]`)
        .nextElementSibling.classList.add("can-buy");
    }
  }
}

refs.scoreTitle.textContent = SCORES;

refs.perksList.addEventListener("click", buyPerk);

function buyPerk(e) {
  if (
    perks[e.target.name].power < Number(localStorage.getItem("power")) &&
    Number(localStorage.getItem("power")) < perks[e.target.name].cost
  ) {
    return;
  }
  localStorage.setItem("power", perks[e.target.name].power);
  POWER = Number(localStorage.getItem("power"));

  document.querySelector(`[name=${e.target.name}]`).disabled = true;
  document
    .querySelector(`[name=${e.target.name}]`)
    .nextElementSibling.classList.remove("can-buy");
  document
    .querySelector(`[name=${e.target.name}]`)
    .nextElementSibling.classList.add("buyed");
  localStorage.setItem("scores", SCORES - perks[e.target.name].cost);
  refs.scoreTitle.textContent = localStorage.getItem("scores");

  for (let key in perks) {
    if (POWER >= perks[key].power) {
      document.querySelector(`[name=${key}]`).disabled = true;
      document
        .querySelector(`[name=${key}]`)
        .nextElementSibling.classList.remove("can-buy");
      document
        .querySelector(`[name=${key}]`)
        .nextElementSibling.classList.add("buyed");
    }
  }
}
