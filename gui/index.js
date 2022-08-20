import { postorder, build } from "./infixToPostfix.js";
const inputElement = document.getElementById("input-equation");
const buttonElement = document.getElementById("convert-button");
const prefixElement = document.getElementById("prefix-equation");
const postfixElement = document.getElementById("postfix-equation");
const outputCard = document.getElementById("output-card");

// let s = "(a^b^(c/d/e-f)^(x*y-m*n))";

buttonElement.addEventListener("click", () => {
  let ans = "";
  let s = inputElement.value;
  s = "(" + s;
  s += ")";
  let root = build(s);

  ans = postorder(root);

  postfixElement.innerHTML = ans;
  outputCard.style.display = "block";
});
