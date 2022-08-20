import { postorder, preorder, build } from "./infixToPostfix.js";
const inputElement = document.getElementById("input-equation");
const buttonElement = document.getElementById("convert-button");
const prefixElement = document.getElementById("prefix-equation");
const postfixElement = document.getElementById("postfix-equation");
const outputCard = document.getElementById("output-card");

buttonElement.addEventListener("click", () => {
  let postorderAns = "";
  let preorderAns = "";
  let s = inputElement.value;
  if (s == "") {
    alert("Enter Infix expression");
  } else {
    s = "(" + s;
    s += ")";
    let root = build(s);

    postorderAns = postorder(root);
    preorderAns = preorder(root);

    postfixElement.innerHTML = postorderAns;
    prefixElement.innerHTML = preorderAns;

    outputCard.style.display = "block";
  }
});
