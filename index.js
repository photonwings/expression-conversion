import {
  buildLinked,
  postorderLinked,
  preorderLinked,
} from "./infitToPostfixLinked.js";
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
const timeArrayPre = document.getElementById("time-a-pre");
const timeArrayPost = document.getElementById("time-a-post");
const timeLinkedPre = document.getElementById("time-l-pre");
const timeLinkedPost = document.getElementById("time-l-post");

const createExpressionHandler = () => {
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
    let endTimeArray = performance.now();
    timeArrayPre.innerHTML = `Time: ${endTimeArray - startTimeArray} MS`;

    startTimeArray = performance.now();
    let preorderAnsArray = preorderArray(root);
    endTimeArray = performance.now();
    timeArrayPost.innerHTML = `Time: ${endTimeArray - startTimeArray} MS`;

    postfixElementArray.innerHTML = postorderAnsArray;
    prefixElementArray.innerHTML = preorderAnsArray;

    // Conversion using Linked List
    root = buildLinked(s);

    let startTimeLinked = performance.now();
    let postorderAnsLinked = postorderLinked(root);
    let endTimeLinked = performance.now();
    timeLinkedPre.innerHTML = `Time: ${endTimeLinked - startTimeLinked} MS`;

    startTimeLinked = performance.now();
    let preorderAnsLinked = preorderLinked(root);
    endTimeLinked = performance.now();
    timeLinkedPost.innerHTML = `Time: ${endTimeLinked - startTimeLinked} MS`;

    postfixElementLinked.innerHTML = postorderAnsLinked;
    prefixElementLinked.innerHTML = preorderAnsLinked;

    outputContainer.style.display = "flex";
  }
};

buttonElement.addEventListener("click", createExpressionHandler);
inputElement.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    createExpressionHandler();
  }
});
