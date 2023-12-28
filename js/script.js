import perks from "./perks.JSON" assert { type: "json" };

const refs = {
  scoreTitle: document.querySelector(".score-title"),
  coinBtn: document.querySelector(".coin-btn"),
  coinImage: document.querySelector(".coin-img"),
  perksList: document.querySelector(".perks-section"),
  costValue: document.querySelector(".cost"),
  wood: document.querySelector("[name=wood]"),
  silver: document.querySelector("[name=silver]"),
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
  if (SCORES < perks[key].cost) {
    refs[key].disabled = true;
  } else {
    refs[key].nextElementSibling.style.color = "green";
  }
  refs[key].nextElementSibling.textContent = perks[key].cost;
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
    if (SCORES >= perks[key].cost) {
      refs[key].disabled = false;
      refs[key].nextElementSibling.style.color = "green";
    }
    if (Number(localStorage.getItem("power")) >= perks[key].power) {
      refs[key].disabled = true;
      refs[key].nextElementSibling.style.color = "grey";
    }
  }
}

refs.scoreTitle.textContent = SCORES;

refs.perksList.addEventListener("click", buyPerk);

function buyPerk(e) {
  if (perks[e.target.name].power < Number(localStorage.getItem("power"))) {
    return;
  }
  localStorage.setItem("power", perks[e.target.name].power);
  POWER = Number(localStorage.getItem("power"));
}
