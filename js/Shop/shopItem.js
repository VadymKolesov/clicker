import { itemPerks } from "./itemPerks";
import { clickLogic } from "../Bonuses/bonuses";

const ItemDoubleClick = document.getElementById("2x");
const ItemFivthCLick = document.getElementById("5x");
const ItemTenthCLick = document.getElementById("10x");
const ItemMaxClick = document.getElementById("999x");
const Balance = document.querySelector("score-title");

LogicClick();

function checkBalance(item, itemElem) {
  const itemQuantity = item.quantyti;

  itemElem.addEventListener("click", () => {
    if (Balance === 1000) {
      ItemDoubleClick.addEventListener("click", () => {
        Balance - itemQuantity;
      });
    }
  });
}
