import {
  postorderArray,
  preorderArray,
  buildArray,
} from "./infixToPostfixArray.js";
const inputElement = document.getElementById("input-equation");
const buttonElement = document.getElementById("convert-button");
const prefixElementArray = document.getElementById("prefix-equation-a");
const postfixElementArray = document.getElementById("postfix-equation-a");
const prefixElementLinked = document.getElementById("prefix-equation-l");
const postfixElementLinked = document.getElementById("postfix-equation-l");
const outputContainer = document.getElementById("output-container");
const timeArray = document.getElementById("time-a");
const timeLinked = document.getElementById("time-l");

buttonElement.addEventListener("click", () => {
  let s = inputElement.value;
  if (s == "") {
    alert("Enter Infix expression");
  } else {
    s = "(" + s;
    s += ")";
    let root = buildArray(s);

    // Conversion using array
    let startTimeArray = performance.now();
    let postorderAnsArray = postorderArray(root);
    let preorderAnsArray = preorderArray(root);
    let endTimeArray = performance.now();

    postfixElementArray.innerHTML = postorderAnsArray;
    prefixElementArray.innerHTML = preorderAnsArray;
    timeArray.innerHTML = `Time: ${endTimeArray - startTimeArray} MS`;

    // Conversion using Linked List
    // let startTimeLinked = performance.now();
    // let postorderAnsLinked = postorderLinked(root);
    // let preorderAnsLinked = preorderLinked(root);
    // let endTimeLinked = performance.now();

    // console.log(endTimeLinked - startTimeLinked);
    // postfixElementLinked.innerHTML = postorderAnsLinked;
    // prefixElementLinked.innerHTML = preorderAnsLinked;
    // timeLinked.innerHTML = `Time: ${endTimeLinked - startTimeLinked} MS`;

    outputContainer.style.display = "flex";
  }
});
